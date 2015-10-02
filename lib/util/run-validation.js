var util = require('util');
var ConfigError = require('../error');

module.exports = function runValidation(options, value, path) {
  var index;
  var item;

  for (index = 0; index < options.length; index++) {
    /* istanbul ignore if */
    if (!options[index]) {
      continue;
    }

    item = options[index];

    if (!item.runable) {
      continue;
    }

    if (item.validator.method.apply(item.validator.method, item.validator.args) !== item.validator.expectedReturn) {
      throw new ConfigError(util.format(item.error.message, item.error.args || []), path);
    }
  }

  return value;
};