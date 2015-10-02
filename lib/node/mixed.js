var merge = require('lodash.merge');
var isFunction = require('lodash.isfunction');
var Condition = require('../condition');
var typeOf = require('../util/type');
var expect = require('../util/expect');

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
    description: null,
    conditions: null
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
 * Adds a new condition to the current node
 *
 * @private
 * @param {string}   type
 * @param {function} condition
 * @param {mixed}    args
 * @return {Condition}
 */
MixedNode.prototype.addCondition = function addCondition(condition, args) {
  var item;

  if (this.options.conditions === null) {
    this.options.conditions = [];
  }

  item = new Condition({
    condition: condition || null,
    args: args || null
  }, this);

  this.options.conditions.push(item);

  return item;
};

/**
 * @param  {function} condition
 * @return {Condition}
 */
MixedNode.prototype.when = function when(condition) {
  return this.addCondition(condition);
};

/**
 * @return {Condition}
 */
MixedNode.prototype.ifTrue = function ifTrue() {
  return this.addCondition(function ifTrueCondition(value) {
    return value === true;
  });
};

/**
 * @return {Condition}
 */
MixedNode.prototype.ifString = function ifString() {
  return this.addCondition(function ifStringCondition(value) {
    return typeOf(value) === 'string';
  });
};

/**
 * @return {Condition}
 */
MixedNode.prototype.ifNull = function ifNull() {
  return this.addCondition(function ifNullCondition(value) {
    return value === null;
  });
};

/**
 * @return {Condition}
 */
MixedNode.prototype.ifArray = function ifArray() {
  return this.addCondition(function ifArrayCondition(value) {
    return Array.isArray(value);
  });
};

/**
 * @return {Condition}
 */
MixedNode.prototype.ifNotInArray = function ifNotInArray(values) {
  return this.addCondition(function ifNotInArrayCondition(stack) {
    return !expect.isInArray(values, stack);
  });
};

/**
 * @return {Condition}
 */
MixedNode.prototype.ifInArray = function ifInArray(values) {
  return this.addCondition(function ifInArrayCondition(stack) {
    return expect.isInArray(values, stack);
  });
};

/**
 * @return {Condition}
 */
MixedNode.prototype.always = function always() {
  return this.addCondition(function ifAlways() {
    return true;
  });
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