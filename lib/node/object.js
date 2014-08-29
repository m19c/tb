'use strict';

var Context   = require('./../context'),
    MixedNode = require('./mixed'),
    util      = require('util');

function ObjectNode(key, parent) {
    ObjectNode.super_.apply(this, [key, parent]);

    this.type    = 'object';
    this.allowed = ['object'];
    this.context = new Context(this);
}

util.inherits(ObjectNode, MixedNode);

ObjectNode.prototype.children = function children() {
    return this.context;
};

module.exports = ObjectNode;