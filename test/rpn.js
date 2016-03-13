/*
'use strict';
var expect = require('expect.js'),
    jsrules = require('..');

describe('jsrules.Proposition', function() {

  it('converts infixed expressions into Reverse Polish Notation', function () {
    var infixedExp = '(p OR q)';
    expect(jsrules.rpn.toRpn(infixedExp)).to.be.equal('p q OR');
  });
});
*/
