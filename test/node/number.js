var assert     = require('chai').assert,
    NumberNode = require('./../../lib/node/number');

describe('NumberNode', function () {
    'use strict';

    describe('validate', function () {
        it('should work with `isGreaterThan`', function () {
            var node = (new NumberNode('my_number')).isGreaterThan(1);

            assert.equal(node.validate(2), 2);

            assert.throws(function () {
                node.validate(1);
            });
        });

        it('should work with `isGreaterOrEqualThan`', function () {
            var node = (new NumberNode('my_number')).isGreaterOrEqualThan(1);

            assert.equal(node.validate(1), 1);
            assert.equal(node.validate(2), 2);

            assert.throws(function () {
                node.validate(0);
            });
        });

        it('should work with `isLowerThan`', function () {
            var node = (new NumberNode('my_number')).isLowerThan(2);

            assert.equal(node.validate(1), 1);

            assert.throws(function () {
                node.validate(3);
            });
        });

        it('should work with `isLowerOrEqualThan`', function () {
            var node = (new NumberNode('my_number')).isLowerOrEqualThan(1);

            assert.equal(node.validate(1), 1);
            assert.equal(node.validate(0), 0);

            assert.throws(function () {
                node.validate(2);
            });
        });

        it('should work with `isEqualTo`', function () {
            var node = (new NumberNode('my_number')).isEqualTo(1337);

            assert.equal(node.validate(1337), 1337);

            assert.throws(function () {
                node.validate(1338);
            });
        });
    });
});