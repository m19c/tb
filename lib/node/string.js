var DefaultNode = require('./default'),
    util        = require('util');

function StringNode(key, parent) {
    StringNode.super_.apply(this, [key, 'string', parent]);
}

util.inherits(StringNode, DefaultNode);

StringNode.prototype.validate = function validate(value) {
    return typeof value === 'string';
};

module.exports = StringNode;