var util = require('util');
var type = require('./../util/type');
var MixedNode = require('./mixed');
var ConfigError = require('./../error');

function BooleanNode(key, parent) {
  BooleanNode.super_.apply(this, [key, parent, {
    expectToBe: null
  }]);

  this.type = 'boolean';
  this.allowed = ['boolean'];
}

util.inherits(BooleanNode, MixedNode);

BooleanNode.prototype.defaultValue = function defaultValue(value) {
  var obtainedType = type(value);

  if (obtainedType !== 'boolean') {
    throw new Error(util.format('Invalid defaultValue type "%s" obtained - expect "boolean"', obtainedType));
  }

  this.currentDefaultValue = value;
  return this;
};

BooleanNode.prototype.expectToBeTrue = function expectToBeTrue() {
  this.options.expectToBe = true;
  return this;
};

BooleanNode.prototype.expectToBeFalse = function expectToBeFalse() {
  this.options.expectToBe = false;
  return this;
};

BooleanNode.prototype.validate = function validate(value, path) {
  if (this.options.expectToBe !== null && this.options.expectToBe !== value) {
    throw new ConfigError(util.format(
      'Expect to be "%s" - go "%s"',
      (this.options.expectToBe === true) ? 'true' : 'false',
      (value === true) ? 'true' : 'false'
    ), path);
  }

  return value;
};

module.exports = BooleanNode;