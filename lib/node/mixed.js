var merge = require('lodash.merge');
var isFunction = require('lodash.isfunction');

/**
 * @constructor
 * @param {string} key
 * @param {MixedNode} parent
 * @param {object} options
 */
function MixedNode(key, parent, options) {
  this.key = key;
  this.parent = parent;
  this.type = 'mixed';
  this.allowed = ['boolean', 'null', 'undefined', 'number', 'string', 'symbol', 'array', 'object', 'function'];

  this.options = merge({
    isRequired: null,
    validators: null,
    ifValidators: null,
    sanitizer: null,
    description: null
  }, options || {});
}

/**
 * Sets the description
 *
 * @param  {string} description
 * @return {MixedNode}
 */
MixedNode.prototype.description = MixedNode.prototype.describe = function description(value) {
  this.options.description = value;
  return this;
};

/**
 * Sets the validator function
 *
 * @param  {function} callback
 * @return {MixedNode}
 */
MixedNode.prototype.validator = function validator(callback) {
  if (this.options.validators === null) {
    this.options.validators = [];
  }

  this.options.validators.push(callback);
  return this;
};

/**
 * Sets a conditional validator
 *
 * @param  {function} condition
 * @param  {function} validator
 * @return {MixedNode}
 */
MixedNode.prototype.validatorIf = function validatorIf(condition, validator) {
  if (!isFunction(condition)) {
    throw new Error('The passed `condition` (first argument) is not a function');
  }

  if (!isFunction(validator)) {
    throw new Error('The passed `validator` (second argument) is not a function');
  }

  if (this.options.ifValidators === null) {
    this.options.ifValidators = [];
  }

  this.options.ifValidators.push({
    condition: condition,
    validator: validator
  });

  return this;
};

/**
 * Setup a sanitizer function
 *
 * @param  {function} callback
 * @return {MixedNode}
 */
MixedNode.prototype.sanitizer = function sanitizer(callback) {
  if (!isFunction(callback)) {
    throw new Error('The passed `callback` (first argument) is not a function');
  }

  this.options.sanitizer = callback;
  return this;
};

/**
 * Defines the default value for this entity
 *
 * @param  {mixed} value
 * @return {MixedNode}
 */
MixedNode.prototype.defaultValue = function defaultValue(value) {
  this.currentDefaultValue = value;
  return this;
};

/**
 * Mark this entity as required
 *
 * @return {MixedNode}
 */
MixedNode.prototype.isRequired = function isRequired() {
  this.options.isRequired = true;
  return this;
};

/**
 * Returns the parent context
 *
 * @return {MixedNode}
 */
MixedNode.prototype.end = function end() {
  if (this.parent.context) {
    return this.parent.context;
  }

  return this.parent;
};

module.exports = MixedNode;