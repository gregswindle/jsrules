'use strict';
var jsrules, util, InvalidRuleElementError;

jsrules = require('.');
InvalidRuleElementError = require('./invalidruleelementerror');

function createRuleElement(name, value, ruleElementType) {
  var type, RuleElement, moduleName;
  type = ruleElementType.replace('jsrules.', '');
  moduleName = './' + type.toLowerCase();
  try {
    RuleElement = require(moduleName);
  }
  catch (err) {
    throw new InvalidRuleElementError('"jsrules.' + type + '" is undefined.');
  }
  return new RuleElement(name, value);
}

function isProposition(ruleElement) {
  return 'jsrules.Proposition' === ruleElement.type;
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
    isProposition: isProposition,
    isRuleElement: isRuleElement,
    isVariable   : isVariable,
  }
};

module.exports = util;
