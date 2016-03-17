'use strict';
var RuleContext, Proposition, Variable;

Proposition = require('./proposition');
Variable = require('./variable');

RuleContext = function(name) {
  this.name = name;
  this.elements = {};
  this.addProposition = function(name, value) {
    this.elements[name] = new Proposition(name, value);
    return this;
  };
  this.addVariable = function(name, value) {
    this.elements[name] = new Variable(name, value);
    return this;
  };
  this.findElement = function(element) {
    return this.elements[element.name] || null;
  };
};

module.exports = RuleContext;
