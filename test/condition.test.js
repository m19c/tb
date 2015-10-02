var Condition = require('./../lib/condition');
var assert = require('chai').assert;

describe('Condition', function() {
  it('merge the options', function() {
    var condition;

    function myCondition() {}
    function myThen() {}

    condition = new Condition({
      condition: myCondition,
      then: myThen
    });

    assert.strictEqual(condition.options.condition, myCondition);
    assert.strictEqual(condition.options.then, myThen);
  });

  it('takes the `affectedNode` as the second argument', function() {
    var condition = new Condition({}, 1337);
    assert.strictEqual(condition.affectedNode, 1337);
  });

  it('`end` returns the `affectedNode`', function() {
    var condition = new Condition({}, 1337);
    assert.strictEqual(condition.end(), 1337);
  });

  it('calling `then()` without the first argument throws an error', function() {
    assert.throws(function() {
      (new Condition()).then();
    }, 'The passed `callback` (first argument) is not a function');
  });
});