'use strict';

var Operator, validOperators, validOperatorVals, InvalidOperatorError;

InvalidOperatorError = require('./invalidoperatorerror');

validOperatorVals = [];

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

Operator.AND = 'AND';
Operator.OR = 'OR';
Operator.XOR = 'XOR';
Operator.NOT = 'NOT';
Operator.EQUAL_TO = 'EQUALTO';
Operator.NOT_EQUAL_TO = 'NOTEQUALTO';
Operator.LESS_THAN = 'LESSTHAN';
Operator.GREATER_THAN = 'GREATERTHAN';
Operator.LESS_THAN_OR_EQUAL_TO = 'LESSTHANOREQUALTO';
Operator.GREATER_THAN_OR_EQUAL_TO = 'GREATERTHANOREQUALTO';

validOperatorVals = (function() {
  var i, keys, vals;
  vals = [];
  keys  = Object.keys(Operator);
  for (i = 0; i < keys.length; i++) {
    vals.push(Operator[keys[i]]);
  }
  return vals;
}());

module.exports = Operator;
