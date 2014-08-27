var assert      = require('chai').assert,
    DefaultNode = require('./../../lib/node/default');

describe('DefaultNode', function () {
    it('should accept `key` as the first argument', function () {
        assert.equal((new DefaultNode('my_key')).key, 'my_key');
    });

    it('should accept `expectedType` as the second argument', function () {
        assert.equal((new DefaultNode('my_key', 'object')).expectedType, 'object');
    });

    it('should accept `parent` as the third argument', function () {
        var parent = new DefaultNode('my_parent_key'),
            child  = new DefaultNode('my_child_key', 'object', parent);

        assert.equal(child.parent, parent);
    });

    it('should throw an error if argument two does not inherit the DefaultNode', function () {
        function MySpecialNode() {}

        assert.throws(function() {
            new ArrayNode('my_key', new MySpecialNode());
        });
    });
});