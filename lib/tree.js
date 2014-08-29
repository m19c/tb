'use strict';

var util        = require('util'),
    typeOf      = require('./util/type'),
    ObjectNode  = require('./node/object'),
    ConfigError = require('./error');

function Tree(name) {
    Tree.super_.apply(this, [name, null]);
}

util.inherits(Tree, ObjectNode);

Tree.prototype.deploy = function deploy(data) {
    function validate(child, value, path) {
        var type = typeOf(value);

        if ('variable-object' === child.type) {
            return value || {};
        }

        if (child.options.isRequired && child.allowed.indexOf(type) === -1) {
            throw new ConfigError(util.format(
                'Invalid type "%s" obtained - expect "%s"', type, child.type
            ), path.join('.'));
        }

        if (child.validate && value) {
            child.validate(value, path.join('.'));
        }

        return value;
    }

    function pass(spec, config, path) {
        var result = {},
            key, isDefined, child, value, loopPath;

        for (key in spec.data) {
            child     = spec.data[key];
            isDefined = config && config.hasOwnProperty(key);
            value     = isDefined ? config[key] : undefined;
            loopPath  = path.slice(0);

            loopPath.push(key);

            if (!isDefined && child.options.isRequired) {
                throw new ConfigError(util.format(
                    'Undefined configuration "%s"', loopPath.join('.')
                ), loopPath.join('.'));
            }

            if (child.context && 'array' !== child.type) {
                result[key] = pass(child.context, value, loopPath);
                continue;
            }

            result[key] = validate(child, value, loopPath);
        }

        return result;
    }

    return pass(this.context, data, [this.key]);
};

module.exports = Tree;