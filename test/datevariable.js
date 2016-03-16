'use strict';
var expect = require('expect.js'),
    jsrules = require('../lib'),
    now,
    _now,
    past,
    future,
    nowTime,
    pastTime,
    futureTime,
    proposition;

beforeEach(function() {
  _now = new Date();
  now = new jsrules.DateVariable('now',  _now);
  nowTime = now.value.getTime();
  past = new jsrules.DateVariable('past',  new Date(_now.getYear() - 1));
  pastTime = past.value.getTime();
  future = new jsrules.DateVariable('future', new Date(_now.getYear() + 1));
  futureTime = future.value.getTime();
});

describe('jsrules.DateVariable', function() {
  it('has a name and a value', function(done) {
    expect(jsrules.DateVariable).to.be.ok();
    expect(now.name).to.equal('now');
    expect(now.value).to.be.ok();
    done();
  });

  it('evaluates whether it is equal to another DateVariable', function(done) {
    proposition = now.equalTo(new jsrules.DateVariable('nowAgain', _now));
    expect(proposition.value).to.be.equal(true);

    done();
  });

  it('evaluates whether it is greater than to another DateVariable', function(done) {
    proposition = now.greaterThan(past);
    expect(proposition.value).to.be.equal(true);

    proposition = past.greaterThan(now);
    expect(proposition.value).not.to.be.equal(true);

    done();
  });

  it('evaluates whether it is greater than or equal to another DateVariable', function(done) {
    proposition = now.greaterThanOrEqualTo(past);
    expect(proposition.value).to.be.equal(true);

    proposition = now.greaterThanOrEqualTo(now);
    expect(proposition.value).to.be.equal(true);

    done();
  });

  it('evaluates it is not equal to another DateVariable', function(done) {
    proposition = now.notEqualTo(past);
    expect(proposition.value).to.be.equal(true);

    proposition = now.notEqualTo(now);
    expect(proposition.value).to.be.equal(false);

    done();
  });

  it('evaluates whether it is less than another DateVariable', function(done) {
    proposition = now.lessThan(past);
    expect(proposition.value).to.be.equal(false);

    proposition = past.lessThan(now);
    expect(proposition.value).to.be.equal(true);
    done();
  });

  it('evaluates whether it is less than or equal to another DateVariable', function(done) {
    proposition = now.lessThanOrEqualTo(past);
    expect(proposition.value).to.be.equal(false);

    proposition = past.lessThanOrEqualTo(now);
    expect(proposition.value).to.be.equal(true);

    proposition = now.lessThanOrEqualTo(now);
    expect(proposition.value).to.be.equal(true);
    done();
  });

  it('provides its type', function(done) {
    expect(now.type).to.equal('jsrules.DateVariable');

    done();
  });

  it('can be ouput as an easy to understand statement', function(done) {
    expect(now.toString()).to.be.match(/Variable name = now, value = /);
    done();
  });

  it('can be serialized as JSON', function(done) {
    expect(JSON.stringify(now)).to.match(/{"name":"now","value":(.*),"type":"jsrules.DateVariable"}/);
    done();
  });

});
