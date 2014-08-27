var DefaultNode = require('./default'),
    util        = require('util');

function NumberNode(key, parent) {
    NumberNode.super_.apply(this, [key, 'number', parent]);
}

util.inherits(NumberNode, DefaultNode);

NumberNode.prototype.validate = function validate(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

module.exports = NumberNode;