var assert    = require('chai').assert,
    ArrayNode = require('./../../lib/node/array');

describe('ArrayNode', function () {
  'use strict';

  describe('validate', function () {
    it('should work with `minLength` and `maxLength`', function () {
      var node = new ArrayNode('my_array');

      node
        .minLength(1)
        .maxLength(3)
      ;

      assert.throws(function () {
        node.validate([]);
      });

      assert.throws(function () {
        node.validate([1, 3, 3, 7]);
      });
    });

    it('should work with `lengthOf`', function () {
      var node     = new ArrayNode('my_array'),
        validValue = [1, 3, 3, 7];

      node.lengthOf(4);

      assert.throws(function () { node.validate([1]); });
      assert.throws(function () { node.validate([1, 3]); });
      assert.throws(function () { node.validate([1, 3, 3]); });
      assert.throws(function () { node.validate([1, 3, 3, 3, 7]); });

      assert.equal(node.validate(validValue), validValue);
    });

    it('should work with `hasKey`', function () {
      var node = new ArrayNode('my_array');

      node
        .hasKey(1)
        .hasKey(3)
        .hasKey(7)
      ;

      assert.throws(function () {
        node.validate([8]);
      });

      assert.ok(node.validate([1, 3, 7]));
      assert.ok(node.validate([1, 3, 3, 7]));
    });
  });
});