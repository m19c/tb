'use strict';

var util      = require('util'),
  MixedNode   = require('./mixed'),
  expect      = require('./../util/expect'),
  ConfigError = require('./../error');

function NumberNode(key, parent) {
  NumberNode.super_.apply(this, [key, parent, {
    greaterThan:        null,
    greaterOrEqualThan: null,
    lowerThan:          null,
    lowerOrEqualThan:   null,
    strictEqualTo:      null
  }]);

  this.type    = 'number';
  this.allowed = ['number'];
}

util.inherits(NumberNode, MixedNode);

NumberNode.prototype.isGreaterThan = function isGreaterThan(value) {
  this.options.greaterThan = value;
  return this;
};

NumberNode.prototype.isGreaterOrEqualThan = function isGreaterOrEqualThan(value) {
  this.options.greaterOrEqualThan = value;
  return this;
};

NumberNode.prototype.isLowerThan = function isLowerThan(value) {
  this.options.lowerThan = value;
  return this;
};

NumberNode.prototype.isLowerOrEqualThan = function isLowerOrEqualThan(value) {
  this.options.lowerOrEqualThan = value;
  return this;
};

NumberNode.prototype.isStrictEqualTo = function isEqualTo(value) {
  this.options.strictEqualTo = value;
  return this;
};

NumberNode.prototype.validate = function validate(value, path) {
  if (
    null !== this.options.greaterThan &&
    false === expect.isGreaterThan(value, this.options.greaterThan)
  ) {
    throw new ConfigError(
      util.format('Expect "%d" to be greater than "%d"', value, this.options.greaterThan),
      path
    );
  }

  if (
    null !== this.options.greaterOrEqualThan &&
    false === expect.isGreaterOrEqualThan(value, this.options.greaterOrEqualThan)
  ) {
    throw new ConfigError(
      util.format('Expect "%d" to be greater or equal than "%d"', value, this.options.greaterOrEqualThan),
      path
    );
  }

  if (
    null !== this.options.lowerThan &&
    false === expect.isLowerThan(value, this.options.lowerThan)
  ) {
    throw new ConfigError(
      util.format('Expect "%d" to be lower than "%d"', value, this.options.lowerThan),
      path
    );
  }

  if (
    null !== this.options.lowerOrEqualThan &&
    false === expect.isLowerOrEqualThan(value, this.options.lowerOrEqualThan)
  ) {
    throw new ConfigError(
      util.format('Expect "%d" to be lower or equal than "%d"', value, this.options.lowerOrEqualThan),
      path
    );
  }

  if (
    null !== this.options.strictEqualTo &&
    false === expect.isStrictEqual(value, this.options.strictEqualTo)
  ) {
    throw new ConfigError(
      util.format('Expect "%d" to be equal with "%d"', value, this.options.strictEqualTo),
      path
    );
  }

  return value;
};

module.exports = NumberNode;