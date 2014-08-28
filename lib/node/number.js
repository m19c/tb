var util      = require('util'),
    MixedNode = require('./mixed');

function NumberNode(key, parent) {
    NumberNode.super_.apply(this, [key, parent, {
        validator: null,
        greaterThan: null,
        greaterOrEqualThan: null,
        lowerThan: null,
        lowerOrEqualThan: null,
        equalTo: null,
        min: null,
        max: null
    }]);

    this.type    = 'number';
    this.allowed = ['number'];
};

util.inherits(NumberNode, MixedNode);

NumberNode.prototype.validate = function validate(callback) {
    this.options.validator = callback;
    return this;
};

NumberNode.prototype.isGreaterThan = function isGreaterThan(value) {
    this.options.greaterThan = value;
    return this;
};

NumberNode.prototype.isGreaterOrEqualThan = function isGreaterOrEqualThan(value) {
    this.options.greaterOrEqualThan = value;
    return this;
};

NumberNode.prototype.isLowerThan = function isLowerThan(value) {
    this.options.lowerThan = value;
    return this;
};

NumberNode.prototype.isLowerOrEqualThan = function isLowerOrEqualThan(value) {
    this.options.lowerOrEqualThan = value;
    return this;
};

NumberNode.prototype.isEqualTo = function isEqualTo(value) {
    this.options.equalTo = value;
    return this;
};

NumberNode.prototype.min = function min(value) {
    this.options.min = value;
    return this;
};

NumberNode.prototype.max = function max(value) {
    this.options.max = value;
    return this;
};

module.exports = NumberNode;