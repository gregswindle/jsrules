/*
'use strict';
var rpn, Operator;

Operator = require('./operator');

String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
};

Array.prototype.clean = function() {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === '') {
            this.splice(i, 1);
        }
    }
    return this;
};

function toRpn(infixedExpression) {
  var outputQueue = '';
  var operatorStack = [];
  var operators = {
    NOT: {
        precedence: 5,
        associativity: 'Right'
    },
    LESSTHAN: {
        precedence: 4,
        associativity: 'Left'
    },
    LESSTHANOREQUALTO: {
        precedence: 4,
        associativity: 'Left'
    },
    GREATERTHAN: {
        precedence: 4,
        associativity: 'Left'
    },
    GREATERTHANOREQUALTO: {
        precedence: 4,
        associativity: 'Left'
    },
    EQUALTO: {
        precedence: 3,
        associativity: 'Left'
    },
    NOTEQUALTO: {
        precedence: 3,
        associativity: 'Left'
    },
    AND: {
        precedence: 2,
        associativity: 'Left'
    },
    OR: {
        precedence: 2,
        associativity: 'Left'
    },
    XOR: {
        precedence: 2,
        associativity: 'Left'
    }
  };
  infixedExpression = infixedExpression.split(/\s+/igm);
    //.replace(/\s+/g, ' ')
    //.split(/([\+\-\*\/\^\(\)])/).clean();
  for(var i = 0; i < infixedExpression.length; i++) {
      var token = infixedExpression[i];
      if(token.isNumeric()) {
          outputQueue += token + ' ';
      }
      else if('^* /+-'.indexOf(token) !== -1) {
          var o1 = token;
          var o2 = operatorStack[operatorStack.length - 1];
          while('^* /+-'.indexOf(o2) !== -1 && ((operators[o1].associativity === 'Left' && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === 'Right' && operators[o1].precedence < operators[o2].precedence))) {
              outputQueue += operatorStack.pop() + ' ';
              o2 = operatorStack[operatorStack.length - 1];
          }
          operatorStack.push(o1);
      }
      else if(token === '(') {
          operatorStack.push(token);
      }
      else if(token === ')') {
          while(operatorStack[operatorStack.length - 1] !== '(') {
              outputQueue += operatorStack.pop() + ' ';
          }
          operatorStack.pop();
      }
  }
  while(operatorStack.length > 0) {
      outputQueue += operatorStack.pop() + ' ';
  }
  return outputQueue;
}

rpn = {
  // https://en.wikipedia.org/wiki/Shunting-yard_algorithm
  toReversePolishNotation: toRpn,
  toRpn: toRpn
};

module.exports = rpn;
*/
