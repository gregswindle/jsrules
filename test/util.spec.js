/*jshint sub:true*/
'use strict';
var jsrules, expect, util;

expect = require('chai').expect;
jsrules = require('../lib');
util = require('../lib/util');

describe('util.ruleElement.factory method', function() {

  it('generates a Variable or Variable sub-type', function () {
    var variable;
    // Without the jsrule namespace
    variable = util.ruleElement.factory('age', 1, 'Variable');
    expect(variable.name).to.be.equal('age');
    expect(variable.type).to.be.equal('jsrules.Variable');

    // With the jsrules namespace
    variable = util.ruleElement.factory('age', 10, 'jsrules.Variable');
    expect(variable.name).to.be.equal('age');
    expect(variable.type).to.be.equal('jsrules.Variable');

    // DateVariable
    variable = util.ruleElement.factory('validFrom', new Date(), 'jsrules.DateVariable');
    expect(variable.name).to.be.equal('validFrom');
    expect(variable.type).to.be.equal('jsrules.DateVariable');
  });

  it('throws "InvalidRuleElementError" for undefined RuleElement types', function () {
    expect(function () {
      util.ruleElement.factory('foo', 'bar', 'FooBar');
    }).to.throw(jsrules.InvalidRuleElementError);
  });

  it('generates a Proposition', function () {
    var proposition;
    // Without the jsrule namespace
    proposition = util.ruleElement.factory('p', true, 'Proposition');
    expect(proposition.name).to.be.equal('p');
    expect(proposition.value).to.be.equal(true);
    expect(proposition.type).to.be.equal('jsrules.Proposition');

    // With the jsrules namespace
    proposition = util.ruleElement.factory('p', true, 'jsrules.Proposition');
    expect(proposition.name).to.be.equal('p');
    expect(proposition.value).to.be.equal(true);
    expect(proposition.type).to.be.equal('jsrules.Proposition');
  });

});
