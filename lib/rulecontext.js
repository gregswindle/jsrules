'use strict';
var RuleContext, Proposition, Variable, util;

Proposition = require('./proposition');
Variable = require('./variable');
util = require('./util');

RuleContext = function(name) {
  this.name = name;
  this.elements = {};
  this.addProposition = function(element, value) {
    if (util.ruleElement.isRuleElement(element)) {
      this.elements[element.name] = element;
    }
    else {
      this.elements[element] = new Proposition(element, value);
    }
    return this;
  };
  this.addVariable = function(element, value, type) {
    if (util.ruleElement.isRuleElement(element)) {
      this.elements[element.name] = element;
    }
    else {
      this.elements[element] = Variable.factory(element, value, type);
    }
    return this;
  };
  this.findElement = function(element) {
    return this.elements[element.name] || null;
  };
};

module.exports = RuleContext;
