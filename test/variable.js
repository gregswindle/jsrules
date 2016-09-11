'use strict';
var expect = require('expect.js'),
    jsrules = require('../lib'),
    amount,
    total,
    proposition;

beforeEach(function() {
  amount = new jsrules.Variable('amount', 100.1);
  total = new jsrules.Variable('total', 100.10);
});

describe('jsrules.Variable', function() {
  it('has a name and a value', function(done) {
    expect(jsrules.Variable).to.be.ok();
    expect(amount.name).to.equal('amount');
    expect(amount.value).to.equal(100.10);
    done();
  });

  it('creates a variable with a factory method', function() {
    var variable = jsrules.Variable.factory('age', 1, 'jsrules.Variable');
    expect(variable).to.be.ok();
    expect(variable.type).to.be.equal('jsrules.Variable');
  });

  it('evaluates whether it is equal to another variable', function(done) {
    proposition = amount.equalTo(total);
    expect(proposition.value).to.be.equal(true);

    // eq alias
    proposition = amount.eq(total);
    expect(proposition.value).to.be.equal(true);
    done();
  });

  it('evaluates whether it is greater than another variable', function(done) {
    proposition = amount.greaterThan(total);
    expect(proposition.value).to.be.equal(false);
    // gt alias
    proposition = amount.gt(total);
    expect(proposition.value).to.be.equal(false);

    amount.value = 100.11;
    proposition = amount.greaterThan(total);
    expect(proposition.value).to.be.equal(true);

    done();
  });

  it('evaluates whether it is greater than or equal to another variable', function(done) {
    proposition = amount.greaterThanOrEqualTo(total);
    expect(proposition.value).to.be.equal(true);
    // gte alias
    proposition = amount.gte(total);
    expect(proposition.value).to.be.equal(true);

    amount.value = 100.11;
    proposition = amount.greaterThanOrEqualTo(total);
    expect(proposition.value).to.be.equal(true);

    done();
  });

  it('evaluates whether it is not equal to another variable', function(done) {
    proposition = amount.notEqualTo(total);
    expect(proposition.value).to.be.equal(false);
    // neq alias
    proposition = amount.neq(total);
    expect(proposition.value).to.be.equal(false);

    amount.value = 0;
    proposition = amount.notEqualTo(total);
    expect(proposition.value).to.be.equal(true);

    done();
  });

  it('evaluates whether it is less than another variable', function(done) {
    proposition = amount.lessThan(total);
    expect(proposition.value).to.be.equal(false);
    // lt alias
    proposition = amount.lt(total);
    expect(proposition.value).to.be.equal(false);

    amount.value = 0;
    proposition = amount.lessThan(total);
    expect(proposition.value).to.be.equal(true);
    done();
  });

  it('evaluates whether it is less than or equal to another variable', function(done) {
    proposition = amount.lessThanOrEqualTo(total);
    expect(proposition.value).to.be.equal(true);
    // lte alias
    proposition = amount.lte(total);
    expect(proposition.value).to.be.equal(true);

    amount.value = 1;
    proposition = amount.lessThanOrEqualTo(total);
    expect(proposition.value).to.be.equal(true);

    amount.value = 1000;
    proposition = amount.lessThanOrEqualTo(total);
    expect(proposition.value).to.be.equal(false);
    done();
  });

  it('evaluates whether an array includes a value', function () {
    amount.value = [1, 2, 3, 4, 5];
    total.value = 1;
    proposition = amount.includes(total);
    expect(proposition.value).to.be.equal(true);

    total.value = 0;
    proposition = amount.includes(total);
    expect(proposition.value).to.be.equal(false);
  });

  it('provides its type', function(done) {
    proposition = amount.lessThan(total);
    expect(proposition.type).to.equal('jsrules.Proposition');

    done();
  });

  it('can be ouput as an easy to understand statement', function(done) {
    expect(amount.toString()).to.be.equal('Variable name = amount, value = 100.1');
    done();
  });

  it('can be serialized as JSON', function(done) {
    expect(JSON.stringify(amount))
      .to
      .be
      .equal('{"name":"amount","value":100.1,"type":"jsrules.Variable"}');
    done();
  });

});
