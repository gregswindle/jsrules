/*jshint sub:true*/
'use strict';
var jsrules, expect, util;

expect = require('chai').expect;
jsrules = require('../lib');
util = require('../lib/util');

describe('util.ruleElement.factory method', function() {
  it('creates a Proposition', function () {
    expect(util.ruleElement.factory('p', true, 'Proposition').type)
      .to.be.equal('jsrules.Proposition');
  });

  it('creates an Operator', function () {
    expect(util.ruleElement.factory(jsrules.Operator.INCLUDES, null, 'Operator').type)
      .to.be.equal('jsrules.Operator');
  });

  it('throws an error for undefined RuleElement types', function() {
    expect(function () {
      util.ruleElement.factory('foo', 'bar', 'FooBar');
    }).to.throw(jsrules.InvalidRuleElementError);
  });
});
