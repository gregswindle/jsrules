'use strict';
var Rule, stack, Operator, Proposition, Variable, RuleContext;

function isVariable(ruleElement) {
  var pattern = /jsrules\.[a-z$]*Variable/ig;
  return pattern.test(ruleElement.type);
}

Operator = require('./operator');
Proposition = require('./proposition');
Variable = require('./variable');
RuleContext = require('./rulecontext');

Rule = function(name) {
  this.name = name;
  this.elements = [];
  this.addOperator = function(operator) {
    this.elements.push(new Operator(operator));
    return this;
  };
  this.addProposition = function(name, value) {
    this.elements.push(new Proposition(name, value));
    return this;
  };
  this.addVariable = function(name, value) {
    this.elements.push(new Variable(name, value));
    return this;
  };
  this.evaluate = function(ruleContext) {
    var i, element, elem, elements;
    elements = [];
    for (i = 0; i < this.elements.length; i++) {
      element = this.elements[i];
      if ('jsrules.Proposition' === element.type || isVariable(element)) {
        elem = ruleContext.findElement(element);
        if (null === element.value) {
          element.value = elem.value;
        }
        else if (null === elem.value) {
          elem.value = element.value;
        }
        element.value = elem.value;
      }
    }
    return process(this.elements);
  };
};

/* jshint unused:false */
function process(elements) {
  var i, element;
  stack = [];
  for (i = 0; i < elements.length; i++) {
    element = elements[i];
    if ('jsrules.Operator' === element.type) {
      processOperator(element);
    }
    else if ('jsrules.Proposition' === element.type) {
      processProposition(element);
    }
    else if (isVariable(element)) {
      processVariable(element);
    }
    else {
      throw new TypeError('InvalidRuleElementError');
    }
  }
  return stack.shift();
}

function processAnd() {
  var lhs, rhs;
  lhs = stack.pop();
  rhs = stack.pop();
  stack.push(rhs.and(lhs));
}

function processEqualTo() {
  var lhs, rhs;
  lhs = stack.pop();
  rhs = stack.pop();
  stack.push(rhs.equalTo(lhs));
}

function processGreaterThan() {
  var lhs, rhs;
  lhs = stack.pop();
  rhs = stack.pop();
  stack.push(rhs.greaterThan(lhs));
}

function processGreaterThanOrEqualTo() {
  var lhs, rhs;
  lhs = stack.pop();
  rhs = stack.pop();
  stack.push(rhs.greaterThanOrEqualTo(lhs));
}

function processLessThan() {
  var lhs, rhs;
  lhs = stack.pop();
  rhs = stack.pop();
  stack.push(rhs.lessThan(lhs));
}

function processLessThanOrEqualTo() {
  var lhs, rhs;
  lhs = stack.pop();
  rhs = stack.pop();
  stack.push(rhs.lessThanOrEqualTo(lhs));
}

function processNot() {
  var rhs = stack.pop();
  stack.push(rhs.not());
}

function processNotEqualTo() {
  var lhs, rhs;
  lhs = stack.pop();
  rhs = stack.pop();
  stack.push(rhs.notEqualTo(lhs));
}

function processOperator(operator) {
  switch (operator.name) {
    case Operator.AND:
      processAnd();
      break;
    case Operator.XOR:
      processXor();
      break;
    case Operator.OR:
      processOr();
      break;
    case Operator.NOT:
      processNot();
      break;
    case Operator.EQUAL_TO:
      processEqualTo();
      break;
    case Operator.LESS_THAN:
      processLessThan();
      break;
    case Operator.GREATER_THAN:
      processGreaterThan();
      break;
    case Operator.LESS_THAN_OR_EQUAL_TO:
      processLessThanOrEqualTo();
      break;
    case Operator.GREATER_THAN_OR_EQUAL_TO:
      processGreaterThanOrEqualTo();
      break;
    case Operator.NOT_EQUAL_TO:
      processNotEqualTo();
      break;
  }
}

function processOr() {
  var lhs, rhs;
  lhs = stack.pop();
  rhs = stack.pop();
  stack.push(rhs.or(lhs));
}

function processProposition(proposition) {
  stack.push(proposition);
}

function processVariable(variable) {
  stack.push(variable);
}

function processXor() {
  var lhs, rhs;
  lhs = stack.pop();
  rhs = stack.pop();
  stack.push(rhs.xor(lhs));
}

module.exports = Rule;
