'use strict';

var defaultAllowed = [
    'array', 'boolean', 'function', 'mixed', 'number', 'object', 'string',
    'variable-object'
  ],
  util = require('util');

function Context(clientNode, allowed) {
  this.data     = {};
  this.clientNode = clientNode;
  this.allowed  = allowed || defaultAllowed;
}

Context.prototype.end = function end() {
  return this.clientNode;
};

Context.prototype.node = function node(key, type) {
  if (this.allowed.indexOf(type) === -1) {
    throw new Error(util.format('The obtained node type "%s" ("%s") is not allowed on this context', type, key));
  }

  this.data[key] = new (require('./node/' + type))(key, this.clientNode);
  return this.data[key];
};

Context.prototype.arrayNode = function arrayNode(key) {
  return this.node(key, 'array');
};

Context.prototype.booleanNode = function booleanNode(key) {
  return this.node(key, 'boolean');
};

Context.prototype.functionNode = function functionNode(key) {
  return this.node(key, 'function');
};

Context.prototype.mixedNode = function mixedNode(key) {
  return this.node(key, 'mixed');
};

Context.prototype.numberNode = function numberNode(key) {
  return this.node(key, 'number');
};

Context.prototype.objectNode = function objectNode(key) {
  return this.node(key, 'object');
};

Context.prototype.variableObjectNode = function variableObjectNode(key) {
  return this.node(key, 'variable-object');
};

Context.prototype.stringNode = function stringNode(key) {
  return this.node(key, 'string');
};

module.exports = Context;