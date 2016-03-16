'use strict';
var expect = require('expect.js'),
    jsrules = require('../lib');

describe('jsrules', function() {
  it('is the namespace for a lightweight, forward-chaining inference engine that models Boolean logic', function(done) {
    expect(jsrules).to.be.ok();
    done();
  });
});
