var DefaultNode = require('./default'),
    util        = require('util'),
    _           = require('underscore'),
    supported   = ['object', 'array', 'string', 'boolean', 'number', 'function'];

function ObjectNode(key, parent) {
    ObjectNode.super_.apply(this, [key, 'object', parent]);
    this.context  = {};
}

util.inherits(ObjectNode, DefaultNode);

ObjectNode.prototype.node = function node(key, type) {
    type = type || 'default';

    if (supported.indexOf(type) < 0) {
        throw new Error(util.format('Invalid node type "%s"', type));
    }

    var TypeClass = require('./' + type);

    this.context[key] = new TypeClass(key, this);

    return this.context[key];
};

Object.prototype.objectNode = function objectNode(key) {
    return this.node(key, 'object');
};

Object.prototype.arrayNode = function arrayNode(key) {
    return this.node(key, 'array');
};

Object.prototype.stringNode = function stringNode(key) {
    return this.node(key, 'string');
};

Object.prototype.booleanNode = function booleanNode(key) {
    return this.node(key, 'boolean');
};

Object.prototype.numberNode = function numberNode(key) {
    return this.node(key, 'number');
};

Object.prototype.functionNode = function functionNode(key) {
    return this.node(key, 'function');
};


ObjectNode.prototype.process = function process(config) {
    return pass(this.context, config, ['root']);
};

function intersect(array1, array2) {
    var section = [],
        item, position, index;

    for (index in array1) {
        position = array2.indexOf(array1[index]);

        if (position >= 0) {
            item = array2.splice(position, 1);
            section.push(array1[index]);
        }
    }

    return section;
}

function pass(definition, config, path) {
    var result  = {},
        missing = [],
        key, item, value, loopPath, tooFew;

    // missing = _.difference(Object.keys(definition), Object.keys(config));
    tooFew = _.difference(Object.keys(config), Object.keys(definition));

    // if (missing.length > 0) {
    //     throw new Error(util.format(
    //         'Missing configuration(s) on the path "%s" detected: %s',
    //         path.join('.'), missing.join(', ')
    //     ));
    // }

    if (tooFew.length > 0) {
        throw new Error(util.format(
            'Too few configuration(s) on path "%s" detected: %s',
            path.join('.'), tooFew.join(', ')
        ));
    }

    for (key in definition) {
        loopPath = path.slice(0);
        item     = definition[key];
        value    = config[key];

        loopPath.push(key);

        if (item.expectedType === 'object') {
            result[key] = pass(item.context, value || {}, loopPath);
            continue;
        }

        if (!value && !item.required && item.hasOwnProperty('defaultValue')) {
            result[key] = item.defaultValue;
            continue;
        }

        if (!item.required) {
            continue;
        }

        if (!item.validate(value)) {
            throw new Error(util.format(
                'Invalid configuration "%s" - expect "%s", got "%s"',
                loopPath.join('.'), item.expectedType, typeof value
            ));
        }

        result[key] = value;
    }

    return result;
}

module.exports = ObjectNode;