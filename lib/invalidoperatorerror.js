'use strict';
var InvalidOperatorError;

InvalidOperatorError = function(message) {
  this.name = 'InvalidOperatorError';
  this.message = message || 'InvalidOperatorError';
};

InvalidOperatorError.prototype = new TypeError();

module.exports = InvalidOperatorError;
