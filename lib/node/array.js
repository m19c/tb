var DefaultNode = require('./default'),
    Tree        = require('./../tree'),
    util        = require('util');

function ArrayNode(key, parent) {
    ArrayNode.super_.apply(this, [key, 'array', parent]);
}

util.inherits(ArrayNode, DefaultNode);

ArrayNode.prototype.validate = function validate(value) {
    return Array.isArray(value);
};

module.exports = ArrayNode;