var typeOf = require('./../../lib/util/type');
var assert = require('chai').assert;

describe('util/type', function() {
  var map = {
    'boolean': [true, false],
    'number': [1, 1.3],
    'string': ['some'],
    'function': [function() {}],
    'array': [[1, 2, 3]],
    'date': [new Date()],
    'regexp': [/test/],
    'object': [{ some: true }],
    'error': [new Error()]
  };
  var expectedType;
  var stack;
  var iterator;
  var value;

  for (expectedType in map) {
    if (!expectedType[map]) {
      continue;
    }

    stack = map[expectedType];

    for (iterator = 0; iterator < stack.length; iterator++) {
      value = stack[iterator];

      /* eslint-disable */
      it('should return `' + expectedType + '`', function() {
        assert.strictEqual(typeOf(value), expectedType);
      });
      /* eslint-enable */
    }
  }

  it('should return null as a string', function() {
    assert.strictEqual(typeOf(null), 'null');
  });
});