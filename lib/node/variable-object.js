var util = require('util');
var MixedNode = require('./mixed');

function VariableObjectNode(key, parent) {
  VariableObjectNode.super_.apply(this, [key, parent]);

  this.type = 'variable-object';
  this.allowed = ['object', 'undefined'];
}

util.inherits(VariableObjectNode, MixedNode);

module.exports = VariableObjectNode;