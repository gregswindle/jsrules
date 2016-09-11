'use strict';
var expect = require('expect.js'),
    jsrules = require('../lib'),
    fact,
    result,
    rule;

describe('jsrules.Rule', function() {

  it('accepts propositions with name and value arguments', function() {
    rule = new jsrules.Rule('eligibleForAirlineUpgrade');
    expect(rule).to.be.ok();
    rule.addProposition('isGoldCardMember', true)
      .addProposition('isSilverCardMember', true);
    expect(rule.elements.length).to.be.equal(2);
  });

  it('accepts propositions directly', function () {
    var p1, p2;
    rule = new jsrules.Rule('eligibleForAirlineUpgrade');
    p1 = new jsrules.Proposition('isGoldCardMember', true);
    p2 = new jsrules.Proposition('isSilverCardMember', true);
    expect(rule).to.be.ok();
    rule
      .addProposition(p1)
      .addProposition(p2);
    expect(rule.elements.length).to.be.equal(2);
  });

  it('accepts operators', function() {
    var operator;
    rule = new jsrules.Rule('eligibleForAirlineUpgrade');
    expect(rule).to.be.ok();
    rule
      .addProposition('isGoldCardMember', true)
      .addProposition('isSilverCardMember', true)
      .addOperator(jsrules.Operator.OR);
    expect(rule.elements.length).to.be.equal(3);
    expect(rule.elements[2].name).to.be.equal('OR');

    // Add an Operator RuleElement
    rule = new jsrules.Rule('eligibleForAirlineUpgrade');
    operator = new jsrules.Operator(jsrules.Operator.OR);
    expect(rule).to.be.ok();
    rule
      .addProposition('isGoldCardMember', true)
      .addProposition('isSilverCardMember', true)
      .addOperator(operator);
    expect(rule.elements.length).to.be.equal(3);
    expect(rule.elements[2].name).to.be.equal('OR');
  });

  it('accepts variables', function() {
    var variable;
    rule = new jsrules.Rule('eligibleForAirlineUpgrade');
    expect(rule).to.be.ok();
    rule.addVariable('minBaggageWeight', 15);
    expect(rule.elements.length).to.be.equal(1);

    // Add variable directly
    rule = new jsrules.Rule('eligibleForAirlineUpgrade');
    expect(rule).to.be.ok();
    variable = new jsrules.Variable('minBaggageWeight', 15);
    rule.addVariable(variable);
    expect(rule.elements.length).to.be.equal(1);
  });

  it('evaulates facts, aka "RuleContexts"', function() {
    var variable = new jsrules.Variable('isSilverCardMember', true);
    fact = new jsrules.RuleContext('eligibleForAirlineUpgrade');
    rule = new jsrules.Rule('eligibleForAirlineUpgrade');

    rule
      .addProposition('isGoldCardMember', true)
      .addProposition(variable)
      .addOperator(jsrules.Operator.OR);

   fact
     .addProposition('isGoldCardMember', true)
     .addProposition('isSilverCardMember', true);

   result = rule.evaluate(fact);
   expect(result.value).to.be.equal(true);
   expect(result.toString()).to.be.equal('Proposition statement = (isGoldCardMember OR isSilverCardMember), value = true');

   fact.elements.isGoldCardMember.value = false;
   result = rule.evaluate(fact);
   expect(result.value).to.be.equal(true);

   fact.elements.isSilverCardMember.value = false;
   result = rule.evaluate(fact);
   expect(result.value).to.be.equal(false);
   expect(result.toString()).to.be.equal('Proposition statement = (isGoldCardMember OR isSilverCardMember), value = false');

   rule = new jsrules.Rule('hasRole');
   fact = new jsrules.RuleContext('hasRole');

   rule.addVariable('roles', null).addVariable('role', 'admin').addOperator(jsrules.Operator.INCLUDES);
   fact.addVariable('roles', ['admin', 'default', 'guest']).addVariable('role', null);
   result = rule.evaluate(fact);
   expect(result.value).to.be.equal(true);

   fact.addVariable('roles', ['guest']).addVariable('role', null);
   result = rule.evaluate(fact);
   expect(result.value).to.be.equal(false);
  });

  it('evaluates complex rules', function() {
    var deadline, currentDate;
    deadline = new Date();
    deadline.setFullYear(deadline.getFullYear() + 1);

    currentDate = new Date();

    rule = new jsrules.Rule('eligibleForAirlineUpgrade');
    rule.addProposition('passengerIsEconomy', true)
        .addProposition('passengerIsGoldCardHolder', true)
        .addProposition('passengerIsSilverCardHolder', true)
        .addOperator(jsrules.Operator.OR)
        .addOperator(jsrules.Operator.AND)
        .addVariable('passengerCarryOnBaggageWeight', null)
        .addVariable('passengerCarryOnBaggageAllowance', 15.0)
        .addOperator(jsrules.Operator.LESS_THAN_OR_EQUAL_TO)
        .addOperator(jsrules.Operator.AND)
        .addVariable('deadline', deadline, jsrules.Variable.TYPES.dateVariable)
        .addVariable('currentDate', null, jsrules.Variable.TYPES.dateVariable)
        .addOperator(jsrules.Operator.GREATER_THAN_OR_EQUAL_TO)
        .addOperator(jsrules.Operator.AND)
        .addVariable('passengerBaggageCount', null)
        .addVariable('passengerBaggageCountMax', 2)
        .addOperator(jsrules.Operator.LESS_THAN)
        .addOperator(jsrules.Operator.AND)
        .addVariable('actualPassengerCreditCardType', null)
        .addVariable('allowedPassengerCreditCardType', 'jsrules Airlines')
        .addOperator(jsrules.Operator.EQUAL_TO)
        .addOperator(jsrules.Operator.AND)
        .addProposition('airlineEmployee', null)
        .addOperator(jsrules.Operator.NOT)
        .addOperator(jsrules.Operator.AND)
        .addVariable('passengerAge', null)
        .addVariable('passengerAgeMin', 10)
        .addOperator(jsrules.Operator.GREATER_THAN)
        .addOperator(jsrules.Operator.AND)
        .addVariable('passengerCarrying', null)
        .addVariable('passengerNoCarryItem', 'firearm')
        .addOperator(jsrules.Operator.NOT_EQUAL_TO)
        .addProposition('passengerNoFlyListEntry', null)
        .addProposition('passengerNoFlyListException', null)
        .addOperator(jsrules.Operator.XOR);

     fact = new jsrules.RuleContext('eligibleForAirlineUpgrade');
     fact.addProposition('passengerIsEconomy', true)
         .addProposition('passengerIsGoldCardHolder', true)
         .addProposition('passengerIsSilverCardHolder', false)
         .addVariable('passengerCarryOnBaggageWeight', 10.0)
         .addVariable('passengerCarryOnBaggageAllowance', null)
         .addVariable('deadline', null, jsrules.Variable.TYPES.dateVariable)
         .addVariable('currentDate', currentDate, jsrules.Variable.TYPES.dateVariable)
         .addVariable('passengerBaggageCount', 1)
         .addVariable('passengerBaggageCountMax', null)
         .addVariable('actualPassengerCreditCardType', 'jsrules Airlines')
         .addVariable('allowedPassengerCreditCardType', null)
         .addProposition('airlineEmployee', false)
         .addVariable('passengerAge', 11)
         .addVariable('passengerAgeMin', null)
         .addVariable('passengerCarrying', 'firearm')
         .addVariable('passengerNoCarryItem', null)
         .addProposition('passengerNoFlyListEntry', false)
         .addProposition('passengerNoFlyListException', true);

    result = rule.evaluate(fact);
    //console.log(JSON.stringify(rule, null, 2));
    //console.log(JSON.stringify(fact, null, 2));
    expect(result.value).to.be.equal(true);
    //console.log(result.toString());
    //expect(result.toString()).to.be.equal('Proposition statement = (((((((passengerIsEconomy AND (passengerIsGoldCardHolder OR passengerIsSilverCardHolder)) AND (passengerCarryOnBaggageWeight <= passengerCarryOnBaggageAllowance)) AND 1489721875126 >= 1458185875126) AND (passengerBaggageCount < passengerBaggageCountMax)) AND (actualPassengerCreditCardType === allowedPassengerCreditCardType)) AND (NOT airlineEmployee)) AND (passengerAge > passengerAgeMin)), value = true');
  });

  it('can be serialized as JSON', function() {
    rule = new jsrules.Rule('cardHolder');
    rule.addProposition('isGoldCardMember', false)
        .addProposition('isSilverCardMember', true)
        .addOperator(jsrules.Operator.OR);
    expect(JSON.stringify(rule)).to.be.equal('{"name":"cardHolder","elements":[{"name":"isGoldCardMember","value":false,"type":"jsrules.Proposition"},{"name":"isSilverCardMember","value":true,"type":"jsrules.Proposition"},{"name":"OR","type":"jsrules.Operator"}]}');
  });

  it('throws a TypeError if an invalid RuleElement is provided', function() {
    function isInvalidRuleElementErrorThrown() {
      var isThrown = false;
      rule = new jsrules.Rule('fooBar');
      rule.elements.push({
        name: 'Foo',
        value: null,
        type: 'FooBar'
      });
      fact = new jsrules.RuleContext('fooBarFact');
      fact.addVariable('Foo', null);
      try {
        rule.evaluate(fact);
      }
      catch (err) {
        isThrown = true;
      }
      return isThrown;
    }

    expect(isInvalidRuleElementErrorThrown()).to.be.equal(true);
  });

});
