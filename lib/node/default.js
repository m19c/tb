var util = require('util');

function DefaultNode(key, type, parent) {
    this.key          = key;
    this.expectedType = type || 'default';
    this.parent       = parent || null;
    this.required     = false;
}

DefaultNode.prototype.defaultsTo = function defaultsTo(value) {
    this.defaultValue = value;
    return this;
};

DefaultNode.prototype.isRequired = function isRequired() {
    this.required = true;
    return this;
};

DefaultNode.prototype.end = function end() {
    return this.parent;
};

DefaultNode.prototype.process = function process(value, path) {
    if (!this.required) {
        return;
    }

    path = path.join('.');

    var obtainedType = typeof value;

    if (this.required && !this.validate(value)) {
        throw new Error(util.format(
            'Invalid value for "%s" obtained - expected "%s", got "%s"',
            path, this.expectedType, obtainedType
        ));
    }
};

module.exports = DefaultNode;