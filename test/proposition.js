'use strict';
var expect = require('expect.js'),
    jsrules = require('../lib'),
    proposition,
    Proposition = require('../lib/proposition'),
    fact,
    result;

beforeEach(function() {
  proposition = new Proposition('allHumansAreMortal', true);
  fact = new Proposition('gregIsHuman', true);
});

describe('jsrules.Proposition', function() {
  it('has a name and a truth value', function(done) {
    expect(proposition.name).to.equal('allHumansAreMortal');
    expect(proposition.value).to.equal(true);
    expect(jsrules.Proposition).to.be.ok();
    done();
  });

  it('performs logical AND operations', function(done) {
    result = proposition.and(fact);
    expect(result.value).to.equal(true);

    fact = new Proposition('fidoIsHuman', false);
    result = proposition.and(fact);
    expect(result.value).to.equal(false);

    proposition = new Proposition('allRocksAreMortal', false);
    result = proposition.and(fact);
    expect(result.value).to.equal(false);

    done();
  });

  it('performs logical OR operations', function(done) {
    result = proposition.or(fact);
    expect(result.value).to.equal(true);

    fact.value = false;
    result = proposition.or(fact);
    expect(result.value).to.equal(true);

    proposition.value = false;
    result = proposition.or(fact);
    expect(result.value).to.equal(false);

    done();
  });

  it('performs logical NOT operations', function(done) {
    result = fact.not();
    expect(result.value).to.equal(false);

    fact.value = false;
    result = fact.not();
    expect(result.value).to.equal(true);

    done();
  });

  it('performs logical XOR operations', function(done) {
    proposition.value = false;
    fact.value = false;
    result = proposition.xor(fact);
    expect(result.value).to.be.equal(false);

    proposition.value = false;
    fact.value = true;
    result = proposition.xor(fact);
    expect(result.value).to.be.equal(true);

    proposition.value = true;
    fact.value = false;
    result = proposition.xor(fact);
    expect(result.value).to.be.equal(true);

    proposition.value = true;
    fact.value = true;
    result = proposition.xor(fact);
    expect(result.value).to.be.equal(false);

    done();
  });

  it('provides its type', function(done) {
    expect(proposition.type).to.equal('jsrules.Proposition');

    done();
  });

  it('can be ouput as an easy to understand statement', function(done) {
    expect(proposition.toString())
      .to
      .be
      .equal('Proposition statement = allHumansAreMortal, value = true');

    result = proposition.and(fact);
    expect(result.toString())
      .to
      .be
      .equal('Proposition statement = (allHumansAreMortal AND gregIsHuman), value = true');

    done();
  });

  it('can be serialized as JSON', function(done) {
    result = proposition.or(fact);
    expect(JSON.stringify(result))
      .to
      .be
      .equal('{"name":"(allHumansAreMortal OR gregIsHuman)","value":true,"type":"jsrules.Proposition"}');
    done();
  });

});
