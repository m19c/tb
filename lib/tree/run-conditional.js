var ConfigError = require('../error');

module.exports = function runConditional(child, result, key, path) {
  var condition;
  var index;
  var executor;

  function generateExecutor() {
    return {
      isDeleted: false,
      isInvalid: false,
      delete: function del() {
        this.isDeleted = true;
      },
      invalid: function invalid() {
        this.isInvalid = true;
      }
    };
  }

  for (index = 0; index < child.options.conditions.length; index++) {
    /* istanbul ignore if */
    if (!child.options.conditions[index]) {
      continue;
    }

    condition = child.options.conditions[index];

    try {
      if (result[key] && condition.options.condition(result[key], key)) {
        if (condition.options.then) {
          executor = generateExecutor();
          result[key] = condition.options.then(result[key], key, executor);

          if (executor.isDeleted) {
            delete result[key];
          }

          if (executor.isInvalid) {
            throw new Error('Marked as invalid');
          }
        }
      }
    } catch (err) {
      throw new ConfigError(err.message, path);
    }
  }
};