'use strict';
var Proposition, Variable, DateVariable;

Proposition = require('./proposition');
DateVariable = require('./datevariable');

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

  this.toString = function() {
    return 'Variable name = ' + this.name + ', value = ' + this.value;
  };
};

Variable.TYPES = {
  dateVariable: 'jsrules.DateVariable',
  variable    : 'jsrules.Variable'
};

Variable.factory = function(name, value, type) {
  if (Variable.TYPES.dateVariable === type) {
    return new DateVariable(name, value);
  }
  return new Variable(name, value);
};

module.exports = Variable;
