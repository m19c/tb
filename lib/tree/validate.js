var util = require('util');
var typeOf = require('../util/type');
var ConfigError = require('../error');

/**
 * @module tree/validate
 * @param  {object} child
 * @param  {string} key
 * @param  {mixed} value
 * @param  {array} path
 * @return {mixed}
 */
module.exports = function validate(child, key, value, path) {
  var type = typeOf(value);
  var index;
  var item;
  var isValid;

  if (child.options.validators !== null) {
    for (index = 0; index < child.options.validators.length; index++) {
      /* istanbul ignore if */
      if (!child.options.validators[index]) {
        continue;
      }

      item = child.options.validators[index];

      try {
        isValid = item(value, key);

        if (!isValid) {
          throw new ConfigError('Validation failed', path);
        }
      } catch (validationError) {
        throw new ConfigError(validationError.message, path.join('.'));
      }
    }
  }

  if (child.options.ifValidators !== null) {
    for (index = 0; index < child.options.ifValidators.length; index++) {
      /* istanbul ignore if */
      if (!child.options.ifValidators[index]) {
        continue;
      }

      item = child.options.ifValidators[index];

      try {
        isValid = true;

        if (item.condition(value, key)) {
          isValid = item.validator(value, key);
        }

        if (!isValid) {
          throw new ConfigError('Validation failed', path);
        }
      } catch (validationError) {
        throw new ConfigError(validationError.message, path.join('.'));
      }
    }
  }

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
};