var util        = require('util'),
    MixedNode   = require('./mixed'),
    ConfigError = require('./../error');

function StringNode(key, parent) {
    StringNode.super_.apply(this, [key, parent, {
        regExpToBeTruly: null,
        regExpToBeFalsely: null,
        minLength: null,
        maxLength: null
    }]);

    this.type    = 'string';
    this.allowed = ['string'];
};

util.inherits(StringNode, MixedNode);

StringNode.prototype.regExpToBeTruly = function regExpToBeTruly(regEx) {
    this.options.regExpToBeTruly = regEx;
    return this;
};

StringNode.prototype.regExpToBeFalsely = function regExpToBeFalsely(regEx) {
    this.options.regExpToBeFalsely = regEx;
    return this;
};

StringNode.prototype.minLength = function minLength(value) {
    this.options.minLength = value;
    return this;
};

StringNode.prototype.maxLength = function maxLength(value) {
    this.options.maxLength = value;
    return this;
};

StringNode.prototype.matchRegExp = function matchRegExp(matcher) {
    this.options.matchRegExp = matcher;
    return this;
};

StringNode.prototype.validate = function validate(value, path) {
    var count = value.length;

    if (null !== this.options.regExpToBeTruly && false === this.options.regExpToBeTruly.test(value)) {
        throw new ConfigError('Expect truly result - got false', path);
    }

    if (null !== this.options.regExpToBeFalsely && true === this.options.regExpToBeFalsely.test(value)) {
        throw new ConfigError('Expect falsely result - got true', path);
    }

    if (null !== this.options.minLength && count < this.options.minLength) {
        throw new ConfigError(util.format('Minimum length of %d not reached', this.options.minLength), path);
    }

    if (null !== this.options.maxLength && count > this.options.maxLength) {
        throw new ConfigError(util.format('Maximum length of %d exceeded', this.options.maxLength), path);
    }

    return value;
};

module.exports = StringNode;