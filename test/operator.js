'use strict';
var expect = require('expect.js'),
    jsrules = require('../lib'),
    operator;

function isErrorThrown() {
  var isThrown = false;
  try {
    new jsrules.Operator('foo');
  }
  catch (err) {
    isThrown = true;
  }
  return isThrown;
}

describe('jsrules.Operator represents a Boolean operator or quantifier that', function() {
  it('has valid names', function(done) {
    expect(jsrules.Operator.AND).to.be.ok();
    expect(jsrules.Operator.OR).to.be.ok();
    expect(jsrules.Operator.XOR).to.be.ok();
    expect(jsrules.Operator.NOT).to.be.ok();
    expect(jsrules.Operator.EQUAL_TO).to.be.ok();
    expect(jsrules.Operator.NOT_EQUAL_TO).to.be.ok();
    expect(jsrules.Operator.LESS_THAN).to.be.ok();
    expect(jsrules.Operator.GREATER_THAN).to.be.ok();
    expect(jsrules.Operator.LESS_THAN_OR_EQUAL_TO).to.be.ok();
    expect(jsrules.Operator.GREATER_THAN_OR_EQUAL_TO).to.be.ok();
    done();
  });

  it('validates the operator argument in its constructor', function() {
    expect(isErrorThrown()).to.be.equal(true);
  });

  it('provides its type', function(done) {
    operator = new jsrules.Operator(jsrules.Operator.AND);
    expect(operator.type).to.be.equal('jsrules.Operator');
    done();
  });

  it('can be output as an easy to read name', function(done) {
    operator = new jsrules.Operator(jsrules.Operator.XOR);
    expect(operator.toString()).to.be.equal('XOR');
    done();
  });

  it('can be serialized as JSON', function(done) {
    operator = new jsrules.Operator(jsrules.Operator.LESS_THAN);
    expect(JSON.stringify(operator)).to.be.equal('{"name":"LESSTHAN","type":"jsrules.Operator"}');
    done();
  });
});
