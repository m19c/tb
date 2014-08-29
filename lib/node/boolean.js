'use strict';

var util        = require('util'),
    type        = require('./../util/type'),
    MixedNode   = require('./mixed'),
    ConfigError = require('./../error');

function BooleanNode(key, parent) {
    BooleanNode.super_.apply(this, [key, parent, {
        expectToBe: null
    }]);

    this.type    = 'boolean';
    this.allowed = ['boolean'];
}

util.inherits(BooleanNode, MixedNode);

BooleanNode.prototype.defaultValue = function defaultValue(defaultValue) {
    var obtainedType = type(defaultValue);

    if ('boolean' !== obtainedType) {
        throw new Error(util.format('Invalid defaultValue type "%s" obtained - expect "boolean"', obtainedType));
    }

    this.defaultValue = defaultValue;
    return this;
};

BooleanNode.prototype.expectToBeTrue = function expectToBeTrue() {
    this.options.expectToBe = true;
    return this;
};

BooleanNode.prototype.expectToBeFalse = function expectToBeFalse() {
    this.options.expectToBe = false;
    return this;
};

BooleanNode.prototype.validate = function validate(value, path) {
    if (null !== this.options.expectToBe && this.options.expectToBe !== value) {
        throw new ConfigError(util.format(
            'Expect to be "%s" - go "%s"',
            (true === this.options.expectToBe) ? 'true' : 'false',
            (true === value) ? 'true' : 'false'
        ), path);
    }

    return value;
};

module.exports = BooleanNode;