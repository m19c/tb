# `config-tree-builder`
[![Code Climate](https://codeclimate.com/github/MrBoolean/config-tree-builder/badges/gpa.svg)](https://codeclimate.com/github/MrBoolean/config-tree-builder) [![Test Coverage](https://codeclimate.com/github/MrBoolean/config-tree-builder/badges/coverage.svg)](https://codeclimate.com/github/MrBoolean/config-tree-builder) [![Build Status](https://travis-ci.org/MrBoolean/config-tree-builder.svg?branch=master)](https://travis-ci.org/MrBoolean/config-tree-builder) [![Dependency Status](https://gemnasium.com/MrBoolean/config-tree-builder.svg)](https://gemnasium.com/MrBoolean/config-tree-builder)

## Example
```javascript
var builder     = require('./index'),
    definition, result;

definition = builder('my_config');

definition
    .children()
        .stringNode('name')
            .isRequired()
        .end()
        .stringNode('version').end()
        .objectNode('support')
            .children()
                .stringNode('homepage').isRequired().end()
            .end()
        .end()
        .arrayNode('leet')
            .isRequired()
            .hasKey(1).hasKey(3).hasKey(7)
            .lengthOf(4)
        .end()
        .variableObjectNode('scripts').isRequired().end()
    .end();

try {
    result = definition.deploy({
        name: 'my-name',
        version: '1.2.0',
        support: {
            homepage: 'http://www.google.com'
        },
        leet: [1, 3, 3, 7]
    });
} catch (error) {
    console.error(error.path + ': ' + error.message);
}
```

## TODO
- Add license (MIT)
- Remove the dependency `underscore` and replace the function `difference`
- Complete the implementation of `tree.js`
- Write some tests
- Create the first release


## API
### global
#### isRequired

### object

### array
#### validate
#### hasKey
#### lengthOf
#### minLength
#### maxLength

### function
#### validate

### string
#### validate
#### regExpToBeTruly
#### regExpToBeFalsely
#### minLength
#### maxLength

### number
#### validate
#### isGreaterThan
#### isLowerThan
#### isGreaterOrEqualThan
#### isLowerOrEqualThan
#### isEqualTo
#### min
#### max

### boolean
#### expectToBeTrue
#### expectToBeFalse