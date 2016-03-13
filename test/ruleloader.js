'use strict';
var jsrules, expect, ruleJson, factJson;

expect = require('expect.js');
jsrules = require('..');
ruleJson = JSON.stringify(require('./fixtures/eligibleforupgrade.rule.json'));
factJson = JSON.stringify(require('./fixtures/eligibleforupgrade.fact.json'));

describe('jsrules.ruleLoader', function() {

  it('loads rules from JSON', function() {
    var rule = jsrules.ruleLoader.loadRule(ruleJson);
    expect(JSON.stringify(rule)).to.be.equal(ruleJson);
  });

  it('loads ruleContexts (i.e., facts) from JSON', function() {
    var ruleContext, fact;
    ruleContext = jsrules.ruleLoader.loadRuleContext(factJson);
    expect(ruleContext).to.be.ok();

    // loadFact is an alias for laodRuleContext
    fact = jsrules.ruleLoader.loadFact(factJson);
    expect(fact).to.be.ok();
  });
});
