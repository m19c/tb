var assert = require('chai').assert;
var MixedNode = require('./../../lib/node/mixed');

describe('MixedNode', function() {
  describe('defaultValue', function() {
    it('should accept a default value', function() {
      var node = new MixedNode('my_mixed_key');

      node.defaultValue('my_default');
      assert.strictEqual(node.currentDefaultValue, 'my_default');
    });
  });

  describe('end', function() {
    it('should return the parent', function() {
      var parent = new MixedNode('parent');
      var child = new MixedNode('child', parent);

      assert.strictEqual(child.end().key, parent.key);
    });
  });

  describe('description', function() {
    it('sets the description', function() {
      var node = new MixedNode('should_have_a_description');

      node.description('My description');
      assert.strictEqual(node.options.description, 'My description');
    });
  });

  describe('sanitizer', function() {
    it('throws an error if the first argument is not a function', function() {
      assert.throws(function() {
        var node = new MixedNode('sanitizer');
        node.sanitizer();
      }, 'The passed `callback` (first argument) is not a function');
    });
  });

  describe('validatorIf', function() {
    it('returns an instance of MixedNode', function() {
      var node = new MixedNode('validator_if');
      assert.strictEqual(node.validatorIf(function() {}, function() {}), node);
    });

    it('throws an error if the first argument is not a function', function() {
      assert.throws(function() {
        var node = new MixedNode('validator_if');
        node.validatorIf();
      }, 'The passed `condition` (first argument) is not a function');
    });

    it('throws an error if the second argument is not a function', function() {
      assert.throws(function() {
        var node = new MixedNode('validator_if');
        node.validatorIf(function() {});
      }, 'The passed `validator` (second argument) is not a function');
    });

    it('stores the passed data in `options`', function() {
      var node = new MixedNode('validator_if');

      function condition() {}
      function validator() {}

      node.validatorIf(condition, validator);

      assert.lengthOf(node.options.validatorIf, 1);
      assert.strictEqual(node.options.validatorIf[0].condition, condition);
      assert.strictEqual(node.options.validatorIf[0].validator, validator);
    });
  });
});