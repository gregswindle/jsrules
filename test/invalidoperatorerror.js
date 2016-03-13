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
});
