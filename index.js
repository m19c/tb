var Tree = require('./lib/tree');

module.exports = function create(name) {
  return new Tree(name || 'root');
};