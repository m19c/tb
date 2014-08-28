var assert     = require('chai').assert,
    StringNode = require('./../../lib/node/string');

describe('StringNode', function () {
    describe('validate', function () {
        it('should work with `regExpToBeTruly`', function () {
            var node = (new StringNode('my_string')).regExpToBeTruly(/leet([137]{4})/);

            assert.equal(node.validate('leet1337'), 'leet1337');

            assert.throws(function () {
                node.validate('invalid');
            });
        });

        it('should work with `regExpToBeFalsely`', function () {
            var node = (new StringNode('my_string')).regExpToBeFalsely(/leet([137]{4})/);

            assert.equal(node.validate('invalid'), 'invalid');

            assert.throws(function () {
                node.validate('leet1337');
            });
        });

        it('should work with `minLength`', function () {
            var node = (new StringNode('my_string')).minLength(3);

            assert.equal(node.validate('leet'), 'leet');

            assert.throws(function () {
                node.validate('le');
            });
        });

        it('should work with `maxLength`', function () {
            var node = (new StringNode('my_string')).maxLength(4);

            assert.equal(node.validate('leet'), 'leet');

            assert.throws(function () {
                node.validate('leeeet');
            });
        });
    });
});