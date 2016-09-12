'use strict';
var Proposition, Variable, DateVariable, InvalidRuleElementError;

Proposition = require('./proposition');
DateVariable = require('./datevariable');
InvalidRuleElementError = require('./invalidruleelementerror');

Variable = function(name, value) {
  this.name = name;
  this.value = value;
  this.type = 'jsrules.Variable';

  this.equalTo = function(variable) {
    var name = '(' + this.name + ' === ' + variable.name + ')';
    return new Proposition(name, this.value === variable.value);
  };

  this.eq = this.equalTo;

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

  this.neq = this.notEqualTo;

  this.includes = function(variable) {
    var name = '(' + this.name + ' INCLUDES ' + variable.name + ')';
    return new Proposition(name, this.value.indexOf(variable.value) !== -1);
  };

  this.toString = function() {
    return 'Variable name = ' + this.name + ', value = ' + this.value;
  };
};

module.exports = Variable;
