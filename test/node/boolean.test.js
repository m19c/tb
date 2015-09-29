var assert = require('chai').assert;
var BooleanNode = require('./../../lib/node/boolean');

describe('BooleanNode', function() {
  describe('defaultValue', function() {
    it('should throw an error if the obtained `defaultValue` is not a boolean', function() {
      var node = new BooleanNode('my_value');

      assert.throws(function() {
        node.defaultValue(1337);
      });
    });

    it('should accept boolean values', function() {
      var node = new BooleanNode('my_value');

      assert.strictEqual(node.defaultValue(true), node);
      assert.strictEqual(node.defaultValue(false), node);
    });
  });

  describe('validate', function() {
    it('should work with `expectToBeTrue`', function() {
      var node = new BooleanNode('my_value');

      node.expectToBeTrue();
      assert.isTrue(node.validate(true));

      assert.throws(function() {
        node.validate(false);
      });
    });

    it('should work with `expectToBeFalse`', function() {
      var node = new BooleanNode('my_value');

      node.expectToBeFalse();
      assert.isFalse(node.validate(false));

      assert.throws(function() {
        node.validate(true);
      });
    });
  });
});