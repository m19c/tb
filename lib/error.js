/* jshint ignore:start */
function ConfigError(message, path) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

    this.message = message;
    this.name = 'ConfigError';
    this.path = path;
}

ConfigError.prototype.prototype = Error.prototype;

module.exports = ConfigError;
/* jshint ignore:end */