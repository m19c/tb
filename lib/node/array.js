var util = require('util');
var MixedNode = require('./mixed');
var ConfigError = require('./../error');
var Context = require('./../context');

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
  var iterator;
  var item;

  if (this.options.minLength !== null && count < this.options.minLength) {
    throw new ConfigError(util.format('Minimum length of %d not reached', this.options.minLength), path);
  }

  if (this.options.maxLength !== null && count > this.options.maxLength) {
    throw new ConfigError(util.format('Maximum length of %d exceeded', this.options.maxLength), path);
  }

  if (this.options.hasKey.length > 0) {
    for (iterator = 0; iterator < this.options.hasKey.length; iterator++) {
      item = this.options.hasKey[iterator];

      if (value.indexOf(item) === -1) {
        throw new ConfigError(util.format('Cannot find required entity "%s"', item), path);
      }
    }
  }

  if (this.options.lengthOf !== null && this.options.lengthOf !== count) {
    throw new ConfigError(
      util.format('Invalid length "%d" - expect "%d"', count, this.options.lengthOf),
      path
    );
  }

  return value;
};

module.exports = ArrayNode;