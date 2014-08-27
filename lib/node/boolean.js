var DefaultNode = require('./default'),
    util        = require('util');

function BooleanNode(key, parent) {
    BooleanNode.super_.apply(this, [key, 'boolean', parent]);
}

util.inherits(BooleanNode, DefaultNode);

BooleanNode.prototype.defaultTrue = function() {
    this.setDefaultValue(true);
    return this;
};

BooleanNode.prototype.defaultFalse = function() {
    this.setDefaultValue(false);
    return this;
};

BooleanNode.prototype.validate = function validate(value) {
    return typeof value === 'boolean';
};

module.exports = BooleanNode;