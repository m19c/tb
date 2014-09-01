'use strict';

var _ = require('underscore');

function MixedNode(key, parent, options) {
    this.key     = key;
    this.parent  = parent;
    this.type    = 'mixed';
    this.allowed = ['boolean', 'null', 'undefined', 'number', 'string', 'symbol', 'array', 'object', 'function'];

    this.options = _.extend({
        isRequired: null,
        validator: null
    }, options || {});
}

MixedNode.prototype.validator = function validator(callback) {
    this.options.validator = callback;
    return this;
};

MixedNode.prototype.defaultValue = function(defaultValue) {
    this.currentDefaultValue = defaultValue;
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