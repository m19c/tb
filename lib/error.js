/**
 * ConfigError
 *
 * @param {string} message  The message of the raised error
 * @param {string} path     The path of the raised error
 */
function ConfigError(message, path) {
  'use strict';

  Error.call(this);
  // Error.captureStackTrace(this, arguments.callee);

  this.message = message;
  this.name    = 'ConfigError';
  this.path    = path;
}

ConfigError.prototype.prototype = Error.prototype;

module.exports = ConfigError;