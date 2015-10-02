var util = require('util');
var walkThrough = require('./tree/walk-through');
var ObjectNode = require('./node/object');

/**
 * @constructor
 * @augments {ObjectNode}
 * @param {string} name
 */
function Tree(name) {
  Tree.super_.apply(this, [name, null]);
}

util.inherits(Tree, ObjectNode);

/**
 * @param  {object} data
 * @return {object}
 */
Tree.prototype.deploy = function deploy(data) {
  return walkThrough(this.context, data, [this.key]);
};

module.exports = Tree;