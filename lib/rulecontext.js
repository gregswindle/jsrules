'use strict';
var RuleContext, InvalidRuleElementError, DateVariable, Proposition, Variable,
  util;

DateVariable = require('./datevariable');
InvalidRuleElementError = require('./invalidruleelementerror');
Proposition = require('./proposition');
Variable = require('./variable');
util = require('./util');

RuleContext = function(name) {
  this.name = name;
  this.elements = {};
  this.addProposition = function(element, value) {
    if (util.ruleElement.isProposition(element)) {
      this.elements[element.name] = element;
    }
    else {
      this.elements[element] = new Proposition(element, value);
    }
    return this;
  };
  this.addVariable = function(element, value, type) {
    var variable;
    type = type || util.ruleElement.TYPE.variable;
    if (util.ruleElement.isVariable(element)) {
      variable = element;
    }
    else {
      variable = util.ruleElement.factory(element, value, type);
    }
    this.elements[variable.name] = variable;
    return this;
  };
  this.findElement = function(element) {
    return this.elements[element.name] || null;
  };
};

module.exports = RuleContext;
