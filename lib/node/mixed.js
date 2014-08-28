var _    = require('underscore'),
    util = require('util'),
    type = require('./../util/type');

function MixedNode(key, parent, options) {
    this.key     = key;
    this.parent  = parent;
    this.type    = 'mixed';
    this.allowed = ['boolean', 'null', 'undefined', 'number', 'string', 'symbol', 'array', 'object', 'function'];

    this.options = _.extend({
        isRequired: null
    }, options || {});
};

MixedNode.prototype.defaultValue = function(defaultValue) {
    this.defaultValue = defaultValue;
    return this;
};

MixedNode.prototype.isRequired = function isRequired() {
    this.options.isRequired = true;
    return this;
};

MixedNode.prototype.end = function end() {
    if (this.parent.context) {
        return this.parent.context;
    }

    return this.parent;
};

module.exports = MixedNode;