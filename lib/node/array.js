var util        = require('util'),
    MixedNode   = require('./mixed'),
    Context     = require('./../context'),
    ConfigError = require('./../error');

function ArrayNode(key, parent) {
    ArrayNode.super_.apply(this, [key, parent, {
        validate: null,
        hasKey: [],
        lengthOf: null,
        minLength: null,
        maxLength: null
    }]);

    this.type    = 'array';
    this.allowed = ['array'];
    this.context = new Context(this);
};

util.inherits(ArrayNode, MixedNode);

ArrayNode.prototype.children = function children() {
    return this.context;
};

ArrayNode.prototype.hasKey = function hasKey(key) {
    this.options.hasKey.push(key);
    return this;
};

ArrayNode.prototype.lengthOf = function lengthOf(value) {
    this.options.lengthOf = value;
    return this;
};

ArrayNode.prototype.minLength = function minLength(value) {
    this.options.minLength = value;
    return this;
};

ArrayNode.prototype.maxLength = function maxLength(value) {
    this.options.maxLength = value;
    return this;
};

ArrayNode.prototype.validate = function validate(value, path) {
    var inherit = ArrayNode.super_.prototype.validate,
        iterator, item;

    if (inherit) {
        inherit.apply(this, [value, path]);
    }

    var count = value.length;

    if (null !== this.options.minLength && count < this.options.minLength) {
        throw new ConfigError(util.format('Minimum length of %d not reached', this.options.minLength), path);
    }

    if (null !== this.options.minLength && count > this.options.maxLength) {
        throw new ConfigError(util.format('Maximum length of %d exceeded', this.options.maxLength), path);
    }

    if (this.options.hasKey.length > 0) {
        for (iterator = 0; iterator < this.options.hasKey.length; iterator++) {
            item = this.options.hasKey[iterator];

            if (value.indexOf(item) === -1) {
                throw new ConfigError(util.format('Cannot find required entity "%s"', item), path);
            }
        }
    }

    if (this.options.lengthOf !== null && this.options.lengthOf !== count) {
        throw new ConfigError(
            util.format('Invalid length "%d" - expect "%d"', count, this.options.lengthOf),
            path
        );
    }

    return value;
};

module.exports = ArrayNode;