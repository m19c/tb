'use strict';

function ConfigError(message, path) {
    Error.call(this);

    /* jshint ignore:start */
    Error.captureStackTrace(this, arguments.callee);
    /* jshint ignore:end */

    this.message = message;
    this.name = 'ConfigError';
    this.path = path;
}

ConfigError.prototype.prototype = Error.prototype;

module.exports = ConfigError;