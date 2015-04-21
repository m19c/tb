var map   = {},
    known = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'],
    index, className;

for (index = 0; index < known.length; index++) {
  className = known[index];
  map['[object ' + className + ']'] = className.toLowerCase();
}

module.exports = function type(value) {
  'use strict';

  if (null === value) {
    return 'null';
  }

  return map[map.toString.call(value)];
};