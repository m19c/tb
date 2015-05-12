'use strict';

var util      = require('util'),
    MixedNode = require('./mixed');

function FunctionNode(key, parent) {
  FunctionNode.super_.apply(this, [key, parent, {
    validate: null
  }]);

  this.type    = 'function';
  this.allowed = ['function'];
}

util.inherits(FunctionNode, MixedNode);

module.exports = FunctionNode;