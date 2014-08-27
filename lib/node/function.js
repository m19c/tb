var DefaultNode = require('./default'),
    util        = require('util');

function FunctionNode(key, parent) {
    FunctionNode.super_.apply(this, [key, 'function', parent]);
}

util.inherits(FunctionNode, DefaultNode);

FunctionNode.prototype.validate = function validate(value) {
    return typeof value === 'function';
};

module.exports = FunctionNode;