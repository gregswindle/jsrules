(function() {
  'use strict';

  var DateVariable, Proposition;

  Proposition = require('./proposition');

  DateVariable = function(name, value) {
    this.name = name;
    this.value = value;
    this.type = 'jsrules.DateVariable';

    this.equalTo = function(variable) {
      var name = this.value.getTime() + ' === ' + variable.value.getTime();
      return new Proposition(name, this.value.getTime() === variable.value.getTime());
    };

    this.greaterThan = function(variable) {
      var name = this.value.getTime() + ' > ' + variable.value.getTime();
      return new Proposition(name, this.value.getTime() > variable.value.getTime());
    };

    this.greaterThanOrEqualTo = function(variable) {
      var name = this.value.getTime() + ' >= ' + variable.value.getTime();
      return new Proposition(name, this.value.getTime() >= variable.value.getTime());
    };

    this.lessThan = function(variable) {
      var name = this.value.getTime() + ' < ' + variable.value.getTime();
      return new Proposition(name, this.value.getTime() < variable.value.getTime());
    };

    this.lessThanOrEqualTo = function(variable) {
      var name = this.value.getTime() + ' <= ' + variable.value.getTime();
      return new Proposition(name, this.value.getTime() <= variable.value.getTime());
    };

    this.notEqualTo = function(variable) {
      var name = this.value.getTime() + ' !== ' + variable.value.getTime();
      return new Proposition(name, this.value.getTime() !== variable.value.getTime());
    };

    this.toString = function() {
      return 'Variable name = ' + this.name + ', value = ' + this.value;
    };
  };

  module.exports = DateVariable;
})();
