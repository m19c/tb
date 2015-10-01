var util = require('util');
var MixedNode = require('./mixed');
var expect = require('./../util/expect');
var ConfigError = require('./../error');

/**
 * @constructor
 * @augments {MixedNode}
 * @param {string} key
 * @param {MixedNode} parent
 */
function NumberNode(key, parent) {
  NumberNode.super_.apply(this, [key, parent, {
    greaterThan: null,
    greaterOrEqualThan: null,
    lowerThan: null,
    lowerOrEqualThan: null,
    strictEqualTo: null,
    equalTo: null
  }]);

  this.type = 'number';
  this.allowed = ['number'];
}

util.inherits(NumberNode, MixedNode);

/**
 * Sets the is greater than validator for this node
 *
 * @param  {number} value
 * @return {NumberNode}
 */
NumberNode.prototype.isGreaterThan = function isGreaterThan(value) {
  this.options.greaterThan = value;
  return this;
};

/**
 * Sets the is greater or equal than validator for this node
 *
 * @param  {number} value
 * @return {NumberNode}
 */
NumberNode.prototype.isGreaterOrEqualThan = function isGreaterOrEqualThan(value) {
  this.options.greaterOrEqualThan = value;
  return this;
};

/**
 * Sets the is lower than validator for this node
 *
 * @param  {number} value
 * @return {NumberNode}
 */
NumberNode.prototype.isLowerThan = function isLowerThan(value) {
  this.options.lowerThan = value;
  return this;
};

/**
 * Sets the is lower or equal than validator for this node
 *
 * @param  {number} value
 * @return {NumberNode}
 */
NumberNode.prototype.isLowerOrEqualThan = function isLowerOrEqualThan(value) {
  this.options.lowerOrEqualThan = value;
  return this;
};

/**
 * @param  {number} value
 * @return {NumberNode}
 */
NumberNode.prototype.isStrictEqualTo = function isStrictEqualTo(value) {
  this.options.strictEqualTo = value;
  return this;
};

/**
 * @param  {number} value
 * @return {NumberNode}
 */
NumberNode.prototype.isEqualTo = function isEqualTo(value) {
  this.options.equalTo = value;
  return this;
};

/**
 * Validates the given `value`
 *
 * @param  {mixed} value
 * @param  {string} path
 * @return {mixed}
 */
NumberNode.prototype.validate = function validate(value, path) {
  var stack = [
    [this.options.greaterThan, expect.isGreaterThan, 'Expect "%d" to be greater or equal than "%d"'],
    [this.options.greaterOrEqualThan, expect.isGreaterOrEqualThan, 'Expect "%d" to be greater than "%d"'],
    [this.options.lowerThan, expect.isLowerThan, 'Expect "%d" to be lower than "%d"'],
    [this.options.lowerOrEqualThan, expect.isLowerOrEqualThan, 'Expect "%d" to be lower or equal than "%d"'],
    [this.options.strictEqualTo, expect.isStrictEqual, 'Expect "%d" to be strict equal with "%d"'],
    [this.options.equalTo, expect.isEqual, 'Expect "%d" to be equal with "%d"']
  ];
  var index;
  var config;
  var validator;
  var message;

  for (index = 0; index < stack.length; index++) {
    if (!stack[index]) {
      continue;
    }

    config = stack[index][0];
    validator = stack[index][1];
    message = stack[index][2];

    if (config !== null && validator(value, config) === false) {
      throw new ConfigError(util.format(message, value, config), path);
    }
  }

  return value;
};

module.exports = NumberNode;