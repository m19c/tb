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
function StringNode(key, parent) {
  StringNode.super_.apply(this, [key, parent, {
    regExpToBeTruly: null,
    regExpToBeFalsely: null,
    minLength: null,
    maxLength: null
  }]);

  this.type = 'string';
  this.allowed = ['string'];
}

util.inherits(StringNode, MixedNode);

/**
 * @param  {RegExp} regEx
 * @return {StringNode}
 */
StringNode.prototype.regExpToBeTruly = function regExpToBeTruly(regEx) {
  this.options.regExpToBeTruly = regEx;
  return this;
};

/**
 * @param  {RegExp} regEx
 * @return {StringNode}
 */
StringNode.prototype.regExpToBeFalsely = function regExpToBeFalsely(regEx) {
  this.options.regExpToBeFalsely = regEx;
  return this;
};

/**
 * @param  {number} value
 * @return {StringNode}
 */
StringNode.prototype.minLength = function minLength(value) {
  this.options.minLength = value;
  return this;
};

/**
 * @param  {number} value
 * @return {StringNode}
 */
StringNode.prototype.maxLength = function maxLength(value) {
  this.options.maxLength = value;
  return this;
};

/**
 * Validates the given `value`
 *
 * @param  {mixed} value
 * @param  {string} path
 * @return {mixed}
 */
StringNode.prototype.validate = function validate(value, path) {
  var count = value.length;

  if (
    this.options.regExpToBeTruly !== null &&
    expect.isRegExpTruly(value, this.options.regExpToBeTruly) === false
  ) {
    throw new ConfigError('Expect truly result - got false', path);
  }

  if (
    this.options.regExpToBeFalsely !== null &&
    expect.isRegExpFalsely(value, this.options.regExpToBeFalsely) === false
  ) {
    throw new ConfigError('Expect falsely result - got true', path);
  }

  if (
    this.options.minLength !== null &&
    expect.isLowerOrEqualThan(count, this.options.minLength) === true
  ) {
    throw new ConfigError(util.format('Minimum length of %d not reached', this.options.minLength), path);
  }

  if (
    this.options.maxLength !== null &&
    expect.isGreaterThan(count, this.options.maxLength) === true
  ) {
    throw new ConfigError(util.format('Maximum length of %d exceeded', this.options.maxLength), path);
  }

  return value;
};

module.exports = StringNode;