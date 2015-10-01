var Context = require('./../context');
var MixedNode = require('./mixed');
var util = require('util');

/**
 * @constructor
 * @augments {MixedNode}
 * @param {string} key
 * @param {MixedNode} parent
 */
function ObjectNode(key, parent) {
  ObjectNode.super_.apply(this, [key, parent]);

  this.type = 'object';
  this.allowed = ['object'];
  this.context = new Context(this);
}

util.inherits(ObjectNode, MixedNode);

/**
 * Gets the child context
 *
 * @return {Context}
 */
ObjectNode.prototype.children = function children() {
  return this.context;
};

module.exports = ObjectNode;