var isObject = require('lodash.isobject');
var isEmpty = require('lodash.isempty');
var union = require('lodash.union');
var util = require('util');
var ConfigError = require('../error');
var validate = require('./validate');
var runConditional = require('./run-conditional');

/**
 * @module tree/walk-through
 * @param  {object} spec
 * @param  {config} config
 * @param  {array} path
 * @param  {boolean} checkDifference
 * @return {object}
 */
module.exports = function walkThrough(spec, config, path, checkDifference) {
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

      result[key] = walkThrough(spec, config[key], loopPath);
    }

    return result;
  }

  for (key in spec.data) {
    /* istanbul ignore if */
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
          result[key] = walkThrough(
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
        result[key] = walkThrough(child.context, value, loopPath, false);
      }
    }

    result[key] = validate(child, key, value, loopPath);

    if (child.options.conditions && child.options.conditions.length > 0) {
      runConditional(child, result, key, loopPath);
    }
  }

  if (few.length > 0) {
    error = new ConfigError(util.format('Too few keys - %s', few.join(', ')), path.join('.'));
    error.few = few;

    throw error;
  }

  return result;
};