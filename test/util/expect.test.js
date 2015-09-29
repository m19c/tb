var expect = require('./../../lib/util/expect');
var assert = require('chai').assert;

describe('util/expect', function() {
  it('isGreaterThan', function() {
    assert.isTrue(expect.isGreaterThan(1, 0));
    assert.isFalse(expect.isGreaterThan(1, 1));
  });

  it('isGreaterOrEqualThan', function() {
    assert.isTrue(expect.isGreaterOrEqualThan(1, 1));
    assert.isTrue(expect.isGreaterOrEqualThan(2, 1));
    assert.isFalse(expect.isGreaterOrEqualThan(0, 1));
  });

  it('isLowerThan', function() {
    assert.isTrue(expect.isLowerThan(0, 1));
    assert.isFalse(expect.isLowerThan(0, 0));
  });

  it('isLowerOrEqualThan', function() {
    assert.isTrue(expect.isLowerOrEqualThan(1, 1));
    assert.isTrue(expect.isLowerOrEqualThan(0, 1));
    assert.isFalse(expect.isLowerOrEqualThan(1, 0));
  });

  it('isStrictEqual', function() {
    assert.isTrue(expect.isStrictEqual(0, 0));
    assert.isFalse(expect.isStrictEqual('0', 0));
  });

  it('isRegExpTruly', function() {
    assert.isTrue(expect.isRegExpTruly('test', /test/));
    assert.isFalse(expect.isRegExpTruly('test', /blub/));
  });

  it('isRegExpFalsely', function() {
    assert.isTrue(expect.isRegExpFalsely('test', /blub/));
    assert.isFalse(expect.isRegExpFalsely('test', /test/));
  });
});