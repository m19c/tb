/**
 * @module util/expect
 */
module.exports = {
  /**
   * @param  {mixed} value
   * @param  {mixed} than
   * @return {boolean}
   */
  isGreaterThan: function isGreaterThan(value, than) {
    return value > than;
  },
  /**
   * @param  {mixed} value
   * @param  {mixed} than
   * @return {boolean}
   */
  isGreaterOrEqualThan: function isGreaterOrEqualThan(value, than) {
    return value >= than;
  },
  /**
   * @param  {mixed} value
   * @param  {mixed} than
   * @return {boolean}
   */
  isLowerThan: function isLowerThan(value, than) {
    return value < than;
  },
  /**
   * @param  {mixed} value
   * @param  {mixed} than
   * @return {boolean}
   */
  isLowerOrEqualThan: function isLowerOrEqualThan(value, than) {
    return value <= than;
  },
  /**
   * @param  {mixed} value
   * @param  {mixed} expected
   * @return {boolean}
   */
  isStrictEqual: function isStrictEqual(value, expected) {
    return value === expected;
  },
  /* eslint-disable */
  /**
   * @param  {mixed} value
   * @param  {mixed} expected
   * @return {boolean}
   */
  isEqual: function isEqual(value, expected) {
    return value == expected;
  },
  /* eslint-enable */
  /**
   * @param  {string} value
   * @param  {RegExp} value
   * @return {boolean}
   */
  isRegExpTruly: function isRegExpTruly(value, regExp) {
    return regExp.test(value) === true;
  },
  /**
   * @param  {string} value
   * @param  {RegExp} value
   * @return {boolean}
   */
  isRegExpFalsely: function isRegExpFalsely(value, regExp) {
    return regExp.test(value) === false;
  },
  /**
   * @param  {array}  values
   * @param  {array}  stack
   * @return {boolean}
   */
  isInArray: function isInArray(values, stack) {
    var index;
    var value;

    for (index = 0; index < values.length; index++) {
      value = values[index];

      /* istanbul ignore if */
      if (!value) {
        continue;
      }

      if (stack.indexOf(value) === -1) {
        return false;
      }
    }

    return true;
  }
};