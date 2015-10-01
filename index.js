/**
 * @module tb
 */

var Tree = require('./lib/tree');

/**
 * @param  {string="root"} name
 * @return {Tree}
 */
module.exports = function create(name) {
  return new Tree(name || 'root');
};