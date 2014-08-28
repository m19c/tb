var util      = require('util'),
    MixedNode = require('./mixed');

function BooleanNode(key, parent) {
    BooleanNode.super_.apply(this, [key, parent, {
        value: null
    }]);

    this.type    = 'boolean';
    this.allowed = ['boolean'];
};

util.inherits(BooleanNode, MixedNode);

BooleanNode.prototype.isTrue = function isTrue() {
    this.options.value = true;
    return this;
};

BooleanNode.prototype.isFalse = function isFalse() {
    this.options.value = false;
    return this;
};

module.exports = BooleanNode;