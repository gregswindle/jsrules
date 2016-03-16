'use strict';
var ruleLoader, ruleElementFactory, Operator, Proposition, Variable,
    DateVariable, Rule, RuleContext;

Operator = require('./operator');
Proposition = require('./proposition');
Variable = require('./variable');
DateVariable = require('./datevariable');
Rule = require('./rule');
RuleContext = require('./rulecontext');

ruleElementFactory = {
  create: function(obj) {
    switch (obj.type) {
      case 'jsrules.Operator':
        return new Operator(obj.name, obj.value);
      case 'jsrules.Proposition':
        return new Proposition(obj.name, obj.value);
      case 'jsrules.Variable':
        return new Variable(obj.name, obj.value);
      case 'jsrules.DateVariable':
        return new DateVariable(obj.name, obj.value);
      default:
        return undefined;
    }
  }
};

ruleLoader = {
  loadRule: function (json) {
    var obj, ruleElement, rule, i;
    obj = JSON.parse(json);
    rule = new Rule(obj.name);
    for (i = 0; i < obj.elements.length; i++) {
      ruleElement = obj.elements[i];
      rule.elements.push(ruleElementFactory.create(ruleElement));
    }
    return rule;
  },
  loadRuleContext: function (json) {
    var obj, ruleElement, ruleContext, i;
    obj = JSON.parse(json);
    ruleContext = new RuleContext(obj.name);
    for (i = 0; i < obj.elements.length; i++) {
      ruleElement = obj.elements[i];
      ruleContext.elements[ruleElement.name] = ruleElementFactory.create(ruleElement);
    }
    return ruleContext;
  },
  loadFact: function (json) {
    return this.loadRuleContext(json);
  }
};

module.exports = ruleLoader;
