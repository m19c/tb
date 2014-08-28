# `config-tree-builder`

## Example
```javascript
var builder = require('config-tree-builder'),
    definition;

definition = builder.define();

definition
    .objectNode('db')
        .stringNode('host')
            .defaultValue('127.0.0.1')
        .end()
        .stringNode('user').isRequired().end()
        .stringNode('pass').isRequired().end()
    .end();

definition.process({ /* my config */ });
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

### number
#### validate
#### isGreaterThan
#### isLowerThan
#### isEqualTo
#### min
#### max