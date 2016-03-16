(function() {
  'use strict';

  var Proposition;

  Proposition = function(name, value) {
    this.name = name;
    this.value = value;
    this.type = 'jsrules.Proposition';
    this.and = function(proposition) {
      var result = {
        name: '(' + this.name + ' AND ' + proposition.name + ')',
        value: this.value && proposition.value
      };
      return new Proposition(result.name, result.value);
    };

    this.not = function() {
      var result = {
        name: '(NOT ' + this.name + ')',
        value: !this.value
      };
      return new Proposition(result.name, result.value);
    };

    this.or = function(proposition) {
      var result = {
        name: '(' + this.name + ' OR ' + proposition.name + ')',
        value: this.value || proposition.value
      };
      return new Proposition(result.name, result.value);
    };

    this.xor = function(proposition) {
      var result = {
        name: '(' + this.name + ' XOR ' + proposition.name + ')',
        /* jshint ignore:start */
        value: !this.value !== !proposition.value
        /* jshint ignore:end */
      };
      return new Proposition(result.name, result.value);
    };

    this.toString = function() {
      return 'Proposition statement = ' + this.name + ', value = ' + this.value;
    };
  };

  module.exports = Proposition;
})();
