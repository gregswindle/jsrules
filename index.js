'use strict';

var jsrules = {
  Proposition         : require('./src/proposition'),
  Operator            : require('./src/operator'),
  InvalidOperatorError: require('./src/invalidoperatorerror'),
  Variable            : require('./src/variable'),
  Rule                : require('./src/rule'),
  RuleContext         : require('./src/rulecontext'),
  DateVariable        : require('./src/datevariable'),
  ruleLoader          : require('./src/ruleloader'),
  //rpn                 : require('./src/rpn')
};

module.exports = jsrules;
