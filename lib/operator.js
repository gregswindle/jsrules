(function() {
  'use strict';

  var Operator, validOperators, validOperatorVals, InvalidOperatorError;

  InvalidOperatorError = require('./invalidoperatorerror');

  validOperatorVals = [];
  validOperators = {};
  validOperators.AND = 'AND';
  validOperators.OR = 'OR';
  validOperators.XOR = 'XOR';
  validOperators.NOT = 'NOT';
  validOperators.EQUAL_TO = 'EQUALTO';
  validOperators.NOT_EQUAL_TO = 'NOTEQUALTO';
  validOperators.LESS_THAN = 'LESSTHAN';
  validOperators.GREATER_THAN = 'GREATERTHAN';
  validOperators.LESS_THAN_OR_EQUAL_TO = 'LESSTHANOREQUALTO';
  validOperators.GREATER_THAN_OR_EQUAL_TO = 'GREATERTHANOREQUALTO';

  function isValidOperator(operator) {
    if (validOperatorVals.indexOf(operator) !== -1) {
      return true;
    }
    return false;
  }

  Operator = function(operator) {
    if (!isValidOperator(operator)) {
      throw new InvalidOperatorError('InvalidOperatorError: "' + operator +'" is not a recoginzed Boolean operator. Please use ' + validOperatorVals.join(', ') + '.');
    }
    this.name = operator;
    this.type = 'jsrules.Operator';
    this.toString = function() {
      return this.name;
    };
  };

  function assignValidOperators() {
    var key;
    for (key in validOperators) {
      validOperatorVals.push(validOperators[key]);
      Operator[key] = validOperators[key];
    }
  }

  assignValidOperators();

  module.exports = Operator;
})();
