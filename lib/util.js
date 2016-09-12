'use strict';
var util, InvalidRuleElementError, Proposition, Variable, DateVariable,
  Operator, TYPE;

InvalidRuleElementError = require('./invalidruleelementerror');
DateVariable = require('./datevariable');
Operator = require('./operator');
Proposition = require('./proposition');
Variable = require('./variable');

TYPE = {
  dateVariable: 'jsrules.DateVariable',
  operator    : 'jsrules.Operator',
  proposition : 'jsrules.Proposition',
  variable    : 'jsrules.Variable'
};

function createRuleElement(name, value, ruleElementType) {
  var type = ruleElementType.replace('jsrules.', '');
  if ('Proposition' === type) {
    return new Proposition(name, value);
  }
  else if ('Variable' === type) {
    return new Variable(name, value);
  }
  else if ('DateVariable' === type) {
    return new DateVariable(name, value);
  }
  else if ('Operator' === type) {
    return new Operator(name);
  }
  else {
    throw new InvalidRuleElementError('"jsrules.' + type + '" is undefined.');
  }
}

function isOperator(ruleElement) {
  return TYPE.operator === ruleElement.type;
}

function isProposition(ruleElement) {
  return TYPE.proposition === ruleElement.type;
}

function isRuleElement(arg) {
  return typeof arg === 'object' && arg.type.indexOf('jsrules.') === 0;
}

function isVariable(ruleElement) {
  var pattern = /jsrules\.[a-z$]*Variable/ig;
  return pattern.test(ruleElement.type);
}

util = {
  ruleElement: {
    factory      : createRuleElement,
    isOperator   : isOperator,
    isProposition: isProposition,
    isRuleElement: isRuleElement,
    isVariable   : isVariable,
    TYPE         : TYPE
  }
};

module.exports = util;
