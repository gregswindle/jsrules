'use strict';
var InvalidRuleElementError;

InvalidRuleElementError = function(message) {
  this.name = 'InvalidRuleElementError';
  this.message = message;
};

InvalidRuleElementError.prototype = new TypeError();

module.exports = InvalidRuleElementError;
