var util = require('util');
var MixedNode = require('./mixed');

/**
 * @constructor
 * @augments {MixedNode}
 * @param {string} key
 * @param {MixedNode} parent
 */
function VariableObjectNode(key, parent) {
  VariableObjectNode.super_.apply(this, [key, parent]);

  this.type = 'variable-object';
  this.allowed = ['object', 'undefined'];
}

util.inherits(VariableObjectNode, MixedNode);

module.exports = VariableObjectNode;