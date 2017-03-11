# `jsrules`

[![Greenkeeper badge](https://badges.greenkeeper.io/gregswindle/jsrules.svg)](https://greenkeeper.io/)

`jsrules` is a JavaScript rule engine that models formal propositional logic. It allows you to separate conditional logic from source code and database triggers in a reusable package, where explicit rules can be independently defined and managed.

[![build status](https://secure.travis-ci.org/gregswindle/jsrules.png)](http://travis-ci.org/gregswindle/jsrules)
[![Coverage Status](https://coveralls.io/repos/github/gregswindle/jsrules/badge.png?branch=master)](https://coveralls.io/github/gregswindle/jsrules?branch=master)
[![Code Climate](https://codeclimate.com/github/gregswindle/jsrules/badges/gpa.svg)](https://codeclimate.com/github/gregswindle/jsrules)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/b6e496204f604f0e9955ca169fc8a1d7)](https://www.codacy.com/app/greg_7/jsrules)

## Overview of `jsrules`

### What are `Rules`?

Rules are explicit constraints that govern actions.

Rules are defined and stored as JSON. They consist of three types of `RuleElements`:

* **Propositions**: statements that are either, `true`, `false`, or `null` (unknown)
* **Variables**: symbols that represent the value of something
* **Operators**: Boolean and quantifier operators

### `RuleContexts` (aka "facts") and `Rules`

`RuleContexts` are facts, stored in text files, databases, etc., that provide the informational context for the execution of `Rules`. `Rules` evaluate `RuleContexts`, returning a `Proposition` that tells us whether a given set of facts conform to the defined `Rule`.

`RuleElements` are evaluated using [Reverse Polish Notation (RPN)](https://en.wikipedia.org/wiki/Reverse_Polish_notation). See the examples below for details.

### Example 1: Is this customer eligible for a discount?

Executing a Rule is simple. Suppose we have a very simple rule that checks whether a customer is eligible for a discount. In order to be eligible, the customer simply needs to be a Gold Card holder.

```javascript
// Create the rule
var rule = new jsrules.Rule('eligibleForDiscount');

// Add a Proposition, i.e., a statement that has a value of true or false
rule.addProposition('customerIsGoldCardHolder', true);

// Create a RuleContext, i.e., a "Fact"
var ruleContext = new jsrules.RuleContext('eligibleForDiscountContext');

// Provide the truth statement as to whether the actual customer
// has a Gold Card
ruleContext.addProposition('customerIsGoldCardHolder', true);

// Evaluate
var result = rule.evaluate(ruleContext);

// Log the resulting Proposition
console.log(result.toString());

// Outputs
// Proposition statement = customerIsGoldCardHolder, value = true
```

### Example 2: Group discount for six or more people

Say you provide a discount to a group of six or more people:

```javascript
// Create the rule
var rule = new jsrules.Rule('eligibleForGroupDiscount');

// Declare a "placeholder" variable for the actual number of people
// (This value will be retrieved from the RuleContext)
rule.addVariable('actualNumPeople', null);

// Declare the minimun number of people required for discount
rule.addVariable('minNumPeople', 6);

// Compare the two, i.e.,
// actualNumPeople >= minNumPeople
rule.addOperator(jsrules.Operator.GREATER_THAN_OR_EQUAL_TO);

// Create a RuleContext, i.e., a "Fact"
var ruleContext = new jsrules.RuleContext('eligibleForGroupDiscountFact');

// How many people are there?
ruleContext.addVariable('actualNumPeople', 5);

// Declare the "placeholder" minimun number of people required for discount
// (This value will be retrieved from the Rule)
ruleContext.addVariable('minNumPeople', null);

// Evaluate
var result = rule.evaluate(ruleContext);

// Log the resulting Proposition
console.log(result.toString());

// OUTPUT:
// Proposition statement =
// (actualNumPeople >= minNumPeople), value = false
```

### Example 3: Is an airline passenger eligible for an upgrade?

In this example, we’re determining whether a given airline passenger is eligible to have their coach seat upgraded to a first-class seat. In order to be eligible, a passenger must:

* be in economy class now and either
* hold a Gold member card or
* hold a Silver member card and
* their carry-on luggage must be less than or equal to 15.0 pounds.

In order to determine this, we must compare a passenger’s facts with our rule.

```javascript
// Create the rule
var rule = new jsrules.Rule('eligibleForUpgrade');

// Populate the rule using method chaining
rule.addProposition('passengerIsEconomy', true)
    .addProposition('passengerIsGoldCardHolder', true)
    .addProposition('passengerIsSilverCardHolder', true)
    .addOperator(jsrules.Operator.OR)
    .addOperator(jsrules.Operator.AND)
    .addVariable('passengerCarryOnBaggageWeight', null)
    .addVariable('passengerCarryOnBaggageAllowance', 15.0)
    .addOperator(jsrules.Operator.LESS_THAN_OR_EQUAL_TO)
    .addOperator(jsrules.Operator.AND);

// Create the RuleContext
var fact = new jsrules.RuleContext('eligibleForUpgradeFact');

// Load it with the facts about the passenger
fact.addProposition('passengerIsEconomy', true)
    .addProposition('passengerIsGoldCardHolder', true)
    .addProposition('passengerIsSilverCardHolder', false)
    .addVariable('passengerCarryOnBaggageWeight', 10.0)
    .addVariable('passengerCarryOnBaggageAllowance', null);

// Log the resulting Proposition
console.log(rule.evaluate(fact));

// Outputs (as a single string; newlines added here for readability):
// Proposition statement = (
//  (passengerIsEconomy AND
//    (passengerIsGoldCardHolder OR passengerIsSilverCardHolder)
//  ) AND (
//    passengerCarryOnBaggageWeight <= passengerCarryOnBaggageAllowance
//  )
// ), value = true
```

## Installation

### `npm`

``` bash
$ npm install jsrules
```

### `bower`

```bash
$ bower install jsrules
```

## Specs/tests

Execute specs (and code coverage) with either

```bash
$ grunt test
```

or

```bash
$ npm test
```

## The origin of `jsrules`: the Rule Archetype Pattern

For a detailed description of `jsrules`, please read chapter 12, “Rule archetype pattern,” in [_Enterprise Patterns and MDA: Building Better Software with Archetype Patterns and UML_](https://www.google.com/search?q=Enterprise+Patterns+and+MDA%3A+Building+Better+Software+with+Archetype+Patterns+and+UML&rlz=1C1CHFX_enUS432US432&oq=Enterprise+Patterns+and+MDA%3A+Building+Better+Software+with+Archetype+Patterns+and+UML&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8). I cannot recommend this book enough, and my thanks go to its authors — Jim Arlow and Ila Neustadt — for their permission to avail the “Rule Archetype Pattern” to JavaScript developers.

## Development roadmap

1. ~~Quality assurance~~
  1. ~~Code coverage with `istanbul`.~~
  2. ~~`travis-ci` integration.~~
  3. ~~Complexity reports.~~
2. Add more operators from `lodash`, e.g., `includes`.
