var util = require('util');
var MixedNode = require('./mixed');
var expect = require('./../util/expect');
var runValidation = require('../util/run-validation');

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
 * @private
 * @param  {mixed} value
 * @param  {string} path
 * @return {mixed}
 */
NumberNode.prototype.validate = function validate(value, path) {
  return runValidation([
    {
      runable: this.options.greaterThan,
      validator: {
        method: expect.isGreaterThan,
        args: [value, this.options.greaterThan],
        expectedReturn: true
      },
      error: {
        message: 'Expect "%d" to be greater or equal than "%d"',
        args: [value, this.options.greaterThan]
      }
    },
    {
      runable: this.options.greaterOrEqualThan,
      validator: {
        method: expect.isGreaterOrEqualThan,
        args: [value, this.options.greaterOrEqualThan],
        expectedReturn: true
      },
      error: {
        message: 'Expect "%d" to be greater than "%d"',
        args: [value, this.options.greaterOrEqualThan]
      }
    },
    {
      runable: this.options.lowerThan,
      validator: {
        method: expect.isLowerThan,
        args: [value, this.options.lowerThan],
        expectedReturn: true
      },
      error: {
        message: 'Expect "%d" to be lower than "%d"',
        args: [value, this.options.lowerThan]
      }
    },
    {
      runable: this.options.lowerOrEqualThan,
      validator: {
        method: expect.isLowerOrEqualThan,
        args: [value, this.options.lowerOrEqualThan],
        expectedReturn: true
      },
      error: {
        message: 'Expect "%d" to be lower or equal than "%d"',
        args: [value, this.options.lowerOrEqualThan]
      }
    },
    {
      runable: this.options.strictEqualTo,
      validator: {
        method: expect.isStrictEqual,
        args: [value, this.options.strictEqualTo],
        expectedReturn: true
      },
      error: {
        message: 'Expect "%d" to be strict equal with "%d"',
        args: [value, this.options.strictEqualTo]
      }
    },
    {
      runable: this.options.equalTo,
      validator: {
        method: expect.isEqual,
        args: [value, this.options.equalTo],
        expectedReturn: true
      },
      error: {
        message: 'Expect "%d" to be equal with "%d"',
        args: [value, this.options.equalTo]
      }
    }
  ], value, path);
};

module.exports = NumberNode;