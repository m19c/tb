var util = require('util');
var MixedNode = require('./mixed');
var Context = require('../context');
var runValidation = require('../util/run-validation');
var expect = require('../util/expect');

/**
 * @constructor
 * @augments {MixedNode}
 * @param {string} key
 * @param {MixedNode} parent
 */
function ArrayNode(key, parent) {
  ArrayNode.super_.apply(this, [key, parent, {
    hasKey: [],
    lengthOf: null,
    minLength: null,
    maxLength: null
  }]);

  this.type = 'array';
  this.allowed = ['array'];
  this.context = new Context(this);
}

util.inherits(ArrayNode, MixedNode);

/**
 * Returns the current context
 *
 * @return {Context}
 */
ArrayNode.prototype.nestedObject = function nestedObject() {
  return this.context;
};

/**
 * Defines that this array **must** contain `key`
 *
 * @param  {string} key
 * @return {ArrayNode}
 */
ArrayNode.prototype.hasKey = function hasKey(key) {
  this.options.hasKey.push(key);
  return this;
};

/**
 * Defines the required length of this array node
 *
 * @param  {number} value
 * @return {ArrayNode}
 */
ArrayNode.prototype.lengthOf = function lengthOf(value) {
  this.options.lengthOf = value;
  return this;
};

/**
 * Defines the min length of this array node
 *
 * @param  {number} value
 * @return {ArrayNode}
 */
ArrayNode.prototype.minLength = function minLength(value) {
  this.options.minLength = value;
  return this;
};

/**
 * Defines the max length of this array node
 *
 * @param  {number} value
 * @return {ArrayNode}
 */
ArrayNode.prototype.maxLength = function maxLength(value) {
  this.options.maxLength = value;
  return this;
};

/**
 * @private
 * @param  {mixed} value
 * @param  {string} path
 * @return {mixed}
 */
ArrayNode.prototype.validate = function validate(value, path) {
  var count = value.length;

  return runValidation([
    {
      runable: this.options.minLength !== null,
      validator: {
        method: expect.isGreaterOrEqualThan,
        args: [count, this.options.minLength],
        expectedReturn: true
      },
      error: {
        message: 'Minimum length of %d not reached',
        args: [this.options.minLength]
      }
    },
    {
      runable: this.options.maxLength !== null,
      validator: {
        method: expect.isLowerThan,
        args: [count, this.options.maxLength],
        expectedReturn: true
      },
      error: {
        message: 'Maximum length of %d exceeded',
        args: [this.options.maxLength]
      }
    },
    {
      runable: this.options.hasKey.length > 0,
      validator: {
        method: expect.isInArray,
        args: [this.options.hasKey, value],
        expectedReturn: true
      },
      error: {
        message: 'Cannot find the required entities ("%s")',
        args: [this.options.hasKey.join(', ')]
      }
    },
    {
      runable: this.options.lengthOf !== null,
      validator: {
        method: expect.isStrictEqual,
        args: [count, this.options.lengthOf],
        expectedReturn: true
      },
      error: {
        message: 'Invalid length "%d" - expect "%d"',
        args: [count, this.options.lengthOf]
      }
    }
  ], value, path);
};

module.exports = ArrayNode;