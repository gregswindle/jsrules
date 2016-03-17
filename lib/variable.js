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

  this.et = this.equalTo;

  this.greaterThan = function(variable) {
    var name = '(' + this.name + ' > ' + variable.name + ')';
    return new Proposition(name, this.value > variable.value);
  };

  this.gt = this.greaterThan;

  this.greaterThanOrEqualTo = function(variable) {
    var name = '(' + this.name + ' >= ' + variable.name + ')';
    return new Proposition(name, this.value >= variable.value);
  };

  this.gte = this.greaterThanOrEqualTo;

  this.lessThan = function(variable) {
    var name = '(' + this.name + ' < ' + variable.name + ')';
    return new Proposition(name, this.value < variable.value);
  };

  this.lt = this.lessThan;

  this.lessThanOrEqualTo = function(variable) {
    var name = '(' + this.name + ' <= ' + variable.name + ')';
    return new Proposition(name, this.value <= variable.value);
  };

  this.lte = this.lessThanOrEqualTo;

  this.notEqualTo = function(variable) {
    var name = '(' + this.name + ' !== ' + variable.name + ')';
    return new Proposition(name, this.value !== variable.value);
  };

  this.net = this.notEqualTo;

  this.toString = function() {
    return 'Variable name = ' + this.name + ', value = ' + this.value;
  };
};

module.exports = Variable;
