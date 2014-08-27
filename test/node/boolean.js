var assert      = require('chai').assert,
    BooleanNode = require('./../../lib/node/boolean'),
    DefaultNode = require('./../../lib/node/default');

describe('BooleanNode', function () {
    it('should inherit DefaultNode', function () {
        assert.instanceOf(new BooleanNode(), DefaultNode);
    });

    it('`expectedType` should match `array`', function () {
        assert.equal((new BooleanNode()).expectedType, 'boolean');
    });

    describe('validate(value)', function () {
        var node = new BooleanNode('key');

        it('should return `false` if the obtained argument is not an array', function () {
            assert.isFalse(node.validate({}));
            assert.isFalse(node.validate(''));
            assert.isFalse(node.validate([]));
            assert.isFalse(node.validate(1));
        });

        it('should return `true` if the obtained argument is an array', function () {
            assert.isTrue(node.validate(true));
            assert.isTrue(node.validate(false));
        });
    });
});