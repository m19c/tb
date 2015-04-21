'use strict';

var util    = require('util'),
  MixedNode = require('./mixed');

function VariableObjectNode(key, parent) {
  VariableObjectNode.super_.apply(this, [key, parent]);

  this.type  = 'variable-object';
  this.allowed = ['object', 'undefined'];
}

util.inherits(VariableObjectNode, MixedNode);

module.exports = VariableObjectNode;