var map   = {},
    known = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'],
    iterator, className;

for (iterator = 0; iterator < known.length; iterator++) {
    className = known[iterator];
    map['[object ' + className + ']'] = className.toLowerCase();
}

module.exports = function type(value) {
    'use strict';

    if (null === value) {
        return 'null';
    }

    return map[map.toString.call(value)];
};