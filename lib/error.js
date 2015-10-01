/**
 * @constructor
 * @augments {Error}
 * @param {string} message  The message of the raised error
 * @param {string} path     The path of the raised error
 */
module.exports = function ConfigError(message, path) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.path = path;
}

require('util').inherits(module.exports, Error);