var Context = require('./../lib/context');
var assert = require('chai').assert;

describe('context', function() {
  describe('node', function() {
    it('should throw an error if the obtained type is unknown', function() {
      var context = new Context();

      assert.throws(function() {
        context.node('my_key', 'scalar');
      });
    });
  });
});