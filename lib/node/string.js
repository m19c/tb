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
 * @private
 * @param  {mixed} value
 * @param  {string} path
 * @return {mixed}
 */
StringNode.prototype.validate = function validate(value, path) {
  var count = value.length;

  return runValidation([
    {
      runable: this.options.regExpToBeTruly !== null,
      validator: {
        method: expect.isRegExpTruly,
        args: [value, this.options.regExpToBeTruly],
        expectedReturn: true
      },
      error: {
        message: 'Expect truly result - got false',
        args: []
      }
    },
    {
      runable: this.options.regExpToBeFalsely !== null,
      validator: {
        method: expect.isRegExpFalsely,
        args: [value, this.options.regExpToBeFalsely],
        expectedReturn: true
      },
      error: {
        message: 'Expect falsely result - got true',
        args: []
      }
    },
    {
      runable: this.options.minLength !== null,
      validator: {
        method: expect.isLowerOrEqualThan,
        args: [count, this.options.minLength],
        expectedReturn: false
      },
      error: {
        message: 'Minimum length of %d not reached',
        args: [this.options.minLength]
      }
    },
    {
      runable: this.options.maxLength !== null,
      validator: {
        method: expect.isGreaterThan,
        args: [count, this.options.maxLength],
        expectedReturn: false
      },
      error: {
        message: 'Maximum length of %d exceeded',
        args: [this.options.maxLength]
      }
    }
  ], value, path);
};

module.exports = StringNode;