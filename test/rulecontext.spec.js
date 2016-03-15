'use strict';
var jsrules, expect;

expect = require('expect.js');
jsrules = require('..');

describe('jsrules.RuleContext', function() {

  it('has a name and elements', function() {
    var fact = new jsrules.RuleContext('someFact');
    expect(fact.name).to.be.equal('someFact');
    expect(fact.elements).to.be.ok();
  });

  it('can find its elements by their names', function() {
    var fact, proposition;
    fact  = new jsrules.RuleContext('fact');
    proposition = new jsrules.Proposition('hasKids', true);
    fact.addProposition('hasKids', true);
    expect(fact.findElement(proposition).type).to.be.equal('jsrules.Proposition');
    expect(fact.findElement('undefinedElement')).to.be.equal(null);
  });
});
