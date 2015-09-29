module.exports = {
  isGreaterThan: function isGreaterThan(value, than) {
    return value > than;
  },
  isGreaterOrEqualThan: function isGreaterOrEqualThan(value, than) {
    return value >= than;
  },
  isLowerThan: function isLowerThan(value, than) {
    return value < than;
  },
  isLowerOrEqualThan: function isLowerOrEqualThan(value, than) {
    return value <= than;
  },
  isStrictEqual: function isStrictEqual(value, expected) {
    return value === expected;
  },
  /* eslint-disable */
  isEqual: function isEqual(value, expected) {
    return value == expected;
  },
  /* eslint-enable */
  isRegExpTruly: function isRegExpTruly(value, regExp) {
    return regExp.test(value) === true;
  },
  isRegExpFalsely: function isRegExpFalsely(value, regExp) {
    return regExp.test(value) === false;
  }
};