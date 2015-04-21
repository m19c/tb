var Tree = require('./lib/tree');

module.exports = function create(name) {
  'use strict';

  return new Tree(name || 'root');
};