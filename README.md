# `config-tree-builder`

## Example
```javascript
var builder = require('config-tree-builder'),
    definition;

definition = builder.define();

definition
    .node('db', 'object')
        .node('host', 'string').defaultValue('127.0.0.1').end()
        .node('user', 'string').isRequired().end()
        .node('pass', 'string').isRequired().end()
    .end();

definition.process({ /* my config */ });
```

## TODO
- Add license (MIT)
- Remove the dependency `underscore` and replace the function `difference`
- Complete the implementation of `tree.js`
- Write some tests
- Create the first release