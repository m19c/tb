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
});