'use strict';
var expect = require('expect.js'),
    jsrules = require('..');

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

describe('jsrules.InvalidOperatorError', function() {
  it('throws a custom TypeError', function() {
    expect(isErrorThrown()).to.be.equal(true);
  });

  it('defaults its message to "InvalidOperatorError" if no message is provided', function() {
    var typeErr = new jsrules.InvalidOperatorError();
    expect(typeErr.message).to.be.equal('InvalidOperatorError');
  });
});
