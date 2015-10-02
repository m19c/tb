var merge = require('lodash.merge');
var isFunction = require('lodash.isfunction');

function toEmptyArray() {
  return [];
}

function toEmptyObject() {
  return {};
}

function toNull() {
  return null;
}

/**
 * @constructor
 * @param {object} options
 * @param {MixedNode} affectedNode
 */
function Condition(options, affectedNode) {
  this.options = merge({
    condition: null,
    then: null
  }, options || {});

  this.affectedNode = affectedNode;
}

Condition.prototype.then = function then(callback) {
  if (!isFunction(callback)) {
    throw new Error('The passed `callback` (first argument) is not a function');
  }

  this.options.then = callback;
  return this;
};

Condition.prototype.thenNull = function thenNull() {
  return this.then(toNull);
};

Condition.prototype.thenEmptyArray = function thenEmptyArray() {
  return this.then(toEmptyArray);
};

Condition.prototype.thenEmptyObject = function thenEmptyObject() {
  return this.then(toEmptyObject);
};

Condition.prototype.thenInvalid = function thenInvalid() {
  return this.then(function invalid(value, key, executor) {
    executor.invalid();
  });
};

Condition.prototype.thenDelete = function thenDelete() {
  return this.then(function del(value, key, executor) {
    executor.delete();
  });
};

Condition.prototype.end = function end() {
  return this.affectedNode;
};

module.exports = Condition;