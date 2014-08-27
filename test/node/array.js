var assert      = require('chai').assert,
    ArrayNode   = require('./../../lib/node/array'),
    DefaultNode = require('./../../lib/node/default');

describe('ArrayNode', function () {
    it('should inherit DefaultNode', function () {
        assert.instanceOf(new ArrayNode(), DefaultNode);
    });

    it('`expectedType` should match `array`', function () {
        assert.equal((new ArrayNode()).expectedType, 'array');
    });

    describe('validate(value)', function () {
        var node = new ArrayNode('key');

        it('should return `false` if the obtained argument is not an array', function () {
            assert.isFalse(node.validate({}));
            assert.isFalse(node.validate(''));
            assert.isFalse(node.validate(true));
            assert.isFalse(node.validate(1));
        });

        it('should return `true` if the obtained argument is an array', function () {
            assert.isTrue(node.validate([]));
        });
    });
});