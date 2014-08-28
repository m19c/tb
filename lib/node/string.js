var util      = require('util'),
    MixedNode = require('./mixed');

function StringNode(key, parent) {
    StringNode.super_.apply(this, [key, parent, {
        validate: null,
        matchRegExp: null,
        notEmpty: null
    }]);

    this.type    = 'string';
    this.allowed = ['string'];
};

util.inherits(StringNode, MixedNode);

StringNode.prototype.notEmpty = function notEmpty() {
    this.options.notEmpty = true;
    return this;
};

StringNode.prototype.validate = function validate(callback) {
    this.options.validate = callback;
    return this;
};

StringNode.prototype.matchRegExp = function matchRegExp(matcher) {
    this.options.matchRegExp = matcher;
    return this;
};

module.exports = StringNode;