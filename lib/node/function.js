var util      = require('util'),
    MixedNode = require('./mixed');

function FunctionNode(key, parent) {
    FunctionNode.super_.apply(this, [key, parent, {
        validate: null
    }]);

    this.type    = 'function';
    this.allowed = ['function'];
};

util.inherits(FunctionNode, MixedNode);

FunctionNode.prototype.validate = function(callback) {
    this.options.validate = callback;
    return this;
};

module.exports = FunctionNode;