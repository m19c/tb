var hbs = require('handlebars');
var merge = require('lodash.merge');
var isFunction = require('lodash.isfunction');
var marked = require('marked');
var beautify = require('js-beautify').js_beautify;

module.exports = function prepareEach(item) {
  var data = {};
  var key;
  var spec;
  var optKey;
  var opt;

  for (key in item) {
    if (!item[key]) {
      continue;
    }

    spec = item[key];

    data[key] = data[key] || { _children: null };
    data[key]._info = merge({}, { type: spec.type }, spec.options);

    for (optKey in data[key]._info) {
      if (!data[key]._info[optKey]) {
        continue;
      }

      opt = data[key]._info[optKey];

      if (isFunction(opt)) {
        data[key]._info[optKey] = new hbs.SafeString(beautify(
          opt.toString(),
          {
            indent_size: 2
          }
        ));
      }
    }

    data[key]._info.description = (data[key]._info.description) ?
      new hbs.SafeString(marked(data[key]._info.description)) :
      null
    ;

    if (spec.context && spec.context.data) {
      data[key]._children = prepareEach(spec.context.data);
    }
  }

  return data;
};