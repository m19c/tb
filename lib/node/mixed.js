var assign = require('lodash.assign');
var isFunction = require('lodash.isfunction');

function MixedNode(key, parent, options) {
  this.key = key;
  this.parent = parent;
  this.type = 'mixed';
  this.allowed = ['boolean', 'null', 'undefined', 'number', 'string', 'symbol', 'array', 'object', 'function'];

  this.options = assign({
    isRequired: null,
    validator: null,
    validatorIf: null,
    sanitizer: null,
    description: null
  }, options || {});
}

MixedNode.prototype.description = function description(value) {
  this.options.description = value;
  return this;
};

MixedNode.prototype.validator = function validator(callback) {
  this.options.validator = callback;
  return this;
};

MixedNode.prototype.validatorIf = function validatorIf(condition, validator) {
  if (!isFunction(condition)) {
    throw new Error('The passed `condition` (first argument) is not a function');
  }

  if (!isFunction(validator)) {
    throw new Error('The passed `validator` (second argument) is not a function');
  }

  if (this.options.validatorIf === null) {
    this.options.validatorIf = [];
  }

  this.options.validatorIf.push({
    condition: condition,
    validator: validator
  });

  return this;
};

MixedNode.prototype.sanitizer = function sanitizer(callback) {
  if (!isFunction(callback)) {
    throw new Error('The passed `callback` (first argument) is not a function');
  }

  this.options.sanitizer = callback;
  return this;
};

MixedNode.prototype.defaultValue = function defaultValue(value) {
  this.currentDefaultValue = value;
  return this;
};

MixedNode.prototype.isRequired = function isRequired() {
  this.options.isRequired = true;
  return this;
};

MixedNode.prototype.end = function end() {
  if (this.parent.context) {
    return this.parent.context;
  }

  return this.parent;
};

module.exports = MixedNode;