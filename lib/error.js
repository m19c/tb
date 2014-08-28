function ConfigError(message, path) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

    this.message = message;
    this.name = 'ConfigError';
    this.path = path;
};

ConfigError.prototype.__proto__ = Error.prototype;

module.exports = ConfigError;