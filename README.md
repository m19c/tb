# `tb`
[![Code Climate](https://codeclimate.com/github/MrBoolean/tb/badges/gpa.svg)](https://codeclimate.com/github/MrBoolean/tb) [![Test Coverage](https://codeclimate.com/github/MrBoolean/tb/badges/coverage.svg)](https://codeclimate.com/github/MrBoolean/tb) [![Build Status](https://travis-ci.org/MrBoolean/tb.svg?branch=master)](https://travis-ci.org/MrBoolean/tb) [![Dependency Status](https://gemnasium.com/MrBoolean/tb.svg)](https://gemnasium.com/MrBoolean/tb) [![npm](https://img.shields.io/npm/v/tb.svg)](https://npmjs.org/tb)

> Sometimes it is necessary to specialize the configuration. Not because you're totally into strict application, but because sometimes you will allow third-party-implementations.

The `tb` (known as `tree-builder`) allows the developer to specialize a configuration fast and without problems through an easy [API](https://github.com/MrBoolean/tb/blob/master/API.md).

[API](https://github.com/MrBoolean/tb/blob/master/API.md) | [Changelog](https://github.com/MrBoolean/tb/blob/master/Changelog.md)

## Install
```bash
npm install tb
```

## Example
```javascript
var builder = require('tb');
var definition = builder('package');
var result;

definition
  .children()
    .stringNode('name').isRequired().end()
    .objectNode('developer')
      .children()
        .stringNode('name').isRequired().end()
        .stringNode('email').isRequired().end()
        .numberNode('age')
          .isGreaterOrEqualThan(18)
        .end()
      .end()
    .end()
  .end();

try {
  result = definition.deploy({
    name: 'Pentakill Package',
    developer: {
      name: 'Jon Doe',
      email: 'jon@doe.com'
    }
  });
} catch (error) {
  console.error(error.path + ': ' + error.message);
}
```

## Docs generator
...

## Contribute
You want to help us? Cool, thanks!

It ist important to watch the given coding standards and to implement them.

At bottom it is very simple.

1. Checkout of the repository.
2. Run `npm install`.
3. Define the content and write some test for it.
4. Implement the new functionality.
5. Run `grunt test`
6. Create a pull-request

## License
The MIT License (MIT)

Copyright (c) 2014 - 2015 Marc Binder <marcandrebinder@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
