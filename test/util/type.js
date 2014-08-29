var typeOf = require('./../../lib/util/type'),
    assert = require('chai').assert;

describe('util/type', function () {
    'use strict';

    it('should return null as a string', function () {
        assert.strictEqual(typeOf(null), 'null');
    });

    var map = {
            'boolean': [true, false],
            'number': [1, 1.3],
            'string': ['some'],
            'function': [function () {}],
            'array': [[1, 2, 3]],
            'date': [new Date()],
            'regexp': [/test/],
            'object': [{ some: true }],
            'error': [new Error()]
        }, expectedType, stack, iterator, value;

    for (expectedType in map) {
        stack = map[expectedType];

        for (iterator = 0; iterator < stack.length; iterator++) {
            value = stack[iterator];

            /* jshint ignore:start */
            it('should return `' + expectedType + '`', function () {
                assert.strictEqual(typeOf(value), expectedType);
            });
            /* jshint ignore:end */
        }
    }
});