var defaultAllowed = [
  'array', 'boolean', 'function', 'mixed', 'number', 'object', 'string',
  'variable-object'
];
var util = require('util');

function Context(clientNode, allowed) {
  this.data = {};
  this.clientNode = clientNode;
  this.allowed = allowed || defaultAllowed;
}

Context.prototype.end = function end() {
  return this.clientNode;
};

/**
 * The main entry point for each node
 *
 * @param  {string} key
 * @param  {string} type
 * @return {MixedNode}
 */
Context.prototype.node = function node(key, type) {
  if (this.allowed.indexOf(type) === -1) {
    throw new Error(util.format('The obtained node type "%s" ("%s") is not allowed on this context', type, key));
  }

  this.data[key] = new (require('./node/' + type))(key, this.clientNode);
  return this.data[key];
};

/**
 * @param  {string} key
 * @return {ArrayNode}
 */
Context.prototype.arrayNode = function arrayNode(key) {
  return this.node(key, 'array');
};

/**
 * @param  {string} key
 * @return {BooleanNode}
 */
Context.prototype.booleanNode = function booleanNode(key) {
  return this.node(key, 'boolean');
};

/**
 * @param  {string} key
 * @return {FunctionNode}
 */
Context.prototype.functionNode = function functionNode(key) {
  return this.node(key, 'function');
};

/**
 * @param  {string} key
 * @return {MixedNode}
 */
Context.prototype.mixedNode = function mixedNode(key) {
  return this.node(key, 'mixed');
};

/**
 * @param  {string} key
 * @return {NumberNode}
 */
Context.prototype.numberNode = function numberNode(key) {
  return this.node(key, 'number');
};

/**
 * @param  {string} key
 * @return {ObjectNode}
 */
Context.prototype.objectNode = function objectNode(key) {
  return this.node(key, 'object');
};

/**
 * @param  {string} key
 * @return {VariableObjectNode}
 */
Context.prototype.variableObjectNode = function variableObjectNode(key) {
  return this.node(key, 'variable-object');
};

/**
 * @param  {string} key
 * @return {StringNode}
 */
Context.prototype.stringNode = function stringNode(key) {
  return this.node(key, 'string');
};

module.exports = Context;