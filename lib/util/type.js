var map = {};
var known = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'];
var index;
var className;

for (index = 0; index < known.length; index++) {
  className = known[index];
  map['[object ' + className + ']'] = className.toLowerCase();
}

/**
 * @module util/type
 * @param  {mixed} value
 * @return {string}
 */
module.exports = function type(value) {
  if (value === null) {
    return 'null';
  }

  return map[map.toString.call(value)];
};