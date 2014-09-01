'use strict';

var util        = require('util'),
    typeOf      = require('./util/type'),
    ObjectNode  = require('./node/object'),
    ConfigError = require('./error'),
    _           = require('underscore');

function Tree(name) {
    Tree.super_.apply(this, [name, null]);
}

util.inherits(Tree, ObjectNode);

Tree.prototype.deploy = function deploy(data) {
    function validate(child, key, value, path) {
        var type = typeOf(value),
            response;

        if ('variable-object' === child.type) {
            return value || {};
        }

        if (child.options.validator) {
            try {
                response = child.options.validator(key, value);
            } catch (validationError) {
                throw new ConfigError(validationError.message, path);
            }

            if (!response) {
                throw new ConfigError(util.format(
                    (
                        'To validate your configuration you need to return an array with two arguments (key as ' +
                        'well as value). Please update the response of the validator "%s"'
                    ),
                    key
                ), path);
            }

            key   = response.shift();
            value = response.shift();
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
            few    = (config) ? Object.keys(config) : [],
            key, isDefined, child, value, loopPath, error;

        for (key in spec.data) {
            child     = spec.data[key];
            isDefined = config && config.hasOwnProperty(key);
            value     = isDefined ? config[key] : undefined;
            loopPath  = path.slice(0);

            if (!isDefined && child.options.isRequired) {
                throw new ConfigError(util.format(
                    'Undefined configuration "%s"', loopPath.join('.')
                ), loopPath.join('.'));
            }

            if (few.indexOf(key) > -1) {
                few.splice(few.indexOf(key), 1);
            }

            if (child.context && 'array' !== child.type) {
                try {
                    result[key] = pass(
                        child.context,
                        validate(child, key, value, loopPath),
                        loopPath
                    );
                } catch (possibleFewError) {
                    if (!possibleFewError.few) {
                        throw possibleFewError;
                    }

                    few = _.union(possibleFewError.few, few);
                }
                continue;
            }

            result[key] = validate(child, key, value, loopPath);
        }

        if (few.length > 0) {
            error = new ConfigError(util.format('Too few keys - %s', few.join(', ')));
            error.few = few;

            throw error;
        }

        return result;
    }

    return pass(this.context, data, [this.key]);
};

module.exports = Tree;