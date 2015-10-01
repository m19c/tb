var util = require('util');
var typeOf = require('./util/type');
var ObjectNode = require('./node/object');
var ConfigError = require('./error');
var isObject = require('lodash.isobject');
var isEmpty = require('lodash.isempty');
var union = require('lodash.union');

/**
 * @constructor
 * @augments {ObjectNode}
 * @param {string} name
 */
function Tree(name) {
  Tree.super_.apply(this, [name, null]);
}

util.inherits(Tree, ObjectNode);

/**
 * @param  {object} data
 * @return {object}
 */
Tree.prototype.deploy = function deploy(data) {
  function validate(child, key, value, path) {
    var type = typeOf(value);
    var isValid;

    if (child.options.validator) {
      try {
        isValid = child.options.validator(key, value);

        if (!isValid) {
          throw new ConfigError('Validation failed', path);
        }
      } catch (validationError) {
        throw new ConfigError(validationError.message, path.join('.'));
      }
    }

    // if (child.options.validatorIf && child.options.validatorIf.length > 0) {
    // }

    if (child.options.isRequired && child.allowed.indexOf(type) === -1) {
      throw new ConfigError(util.format(
        'Invalid type "%s" obtained - expect "%s"', type, child.type
      ), path.join('.'));
    }

    if (child.validate && value) {
      child.validate(value, path.join('.'));
    }

    if (child.options.sanitizer) {
      try {
        value = child.options.sanitizer(value);
      } catch (sanitizeError) {
        throw new ConfigError(sanitizeError.message, path);
      }
    }

    return value;
  }

  function pass(spec, config, path, checkDifference) {
    var result = {};
    var few = [];
    var key;
    var isDefined;
    var child;
    var value;
    var loopPath;
    var error;

    checkDifference = (typeof checkDifference === 'undefined') ? true : checkDifference;

    if (checkDifference && isObject(config)) {
      few = Object.keys(config);
    }

    if (Array.isArray(config)) {
      result = [];

      for (key = 0; key < config.length; key++) {
        loopPath = path.slice(0);
        loopPath.push(key);

        result[key] = pass(spec, config[key], loopPath);
      }

      return result;
    }

    for (key in spec.data) {
      if (!spec.data[key]) {
        continue;
      }

      child = spec.data[key];
      isDefined = config && config.hasOwnProperty(key);
      value = isDefined ? config[key] : undefined;
      loopPath = path.slice(0);

      loopPath.push(key);

      if (!isDefined && child.options.isRequired) {
        throw new ConfigError(util.format(
          'Undefined configuration "%s"', loopPath.join('.')
        ), loopPath.join('.'));
      }

      if (few.indexOf(key) > -1) {
        few.splice(few.indexOf(key), 1);
      }

      if (child.context) {
        if (child.type === 'object') {
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

            few = union(possibleFewError.few, few);
          }
        } else if (child.type === 'array' && !isEmpty(child.context.data)) {
          result[key] = pass(child.context, value, loopPath, false);
        }
      }

      result[key] = validate(child, key, value, loopPath);
    }

    if (few.length > 0) {
      error = new ConfigError(util.format('Too few keys - %s', few.join(', ')), path.join('.'));
      error.few = few;

      throw error;
    }

    return result;
  }

  return pass(this.context, data, [this.key]);
};

module.exports = Tree;