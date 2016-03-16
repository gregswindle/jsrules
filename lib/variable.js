'use strict';
var Proposition, Variable;

Proposition = require('./proposition');

Variable = function(name, value) {
  this.name = name;
  this.value = value;
  this.type = 'jsrules.Variable';

  this.equalTo = function(variable) {
    var name = '(' + this.name + ' === ' + variable.name + ')';
    return new Proposition(name, this.value === variable.value);
  };

  this.greaterThan = function(variable) {
    var name = '(' + this.name + ' > ' + variable.name + ')';
    return new Proposition(name, this.value > variable.value);
  };

  this.greaterThanOrEqualTo = function(variable) {
    var name = '(' + this.name + ' >= ' + variable.name + ')';
    return new Proposition(name, this.value >= variable.value);
  };

  this.lessThan = function(variable) {
    var name = '(' + this.name + ' < ' + variable.name + ')';
    return new Proposition(name, this.value < variable.value);
  };

  this.lessThanOrEqualTo = function(variable) {
    var name = '(' + this.name + ' <= ' + variable.name + ')';
    return new Proposition(name, this.value <= variable.value);
  };

  this.notEqualTo = function(variable) {
    var name = '(' + this.name + ' !== ' + variable.name + ')';
    return new Proposition(name, this.value !== variable.value);
  };

  this.toString = function() {
    return 'Variable name = ' + this.name + ', value = ' + this.value;
  };
};

module.exports = Variable;
