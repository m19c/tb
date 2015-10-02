`tb`
====
[![Code Climate](https://codeclimate.com/github/MrBoolean/tb/badges/gpa.svg)](https://codeclimate.com/github/MrBoolean/tb) [![Test Coverage](https://codeclimate.com/github/MrBoolean/tb/badges/coverage.svg)](https://codeclimate.com/github/MrBoolean/tb) [![Build Status](https://travis-ci.org/MrBoolean/tb.svg?branch=master)](https://travis-ci.org/MrBoolean/tb) [![Dependency Status](https://gemnasium.com/MrBoolean/tb.svg)](https://gemnasium.com/MrBoolean/tb) [![npm](https://img.shields.io/npm/v/tb.svg)](https://npmjs.org/tb) [![Open The Docs](https://img.shields.io/badge/open-the%20docs-1abc9c.svg)](http://mrboolean.github.io/tb/)

[![NPM](https://nodei.co/npm/tb.png?downloads=true)](https://nodei.co/npm/tb/)

Specify objects and its economy.

**Goal**

`tb` gives you a bunch of functions to specify an object. You can assign booleans, functions, arrays, objects (adjustable and fully declared), numbers, strings and unknown values. Move through your object tree using chainable functions. The pipeline will never end (until you do a misstake or move out of your tree). Once your tree is ready you can pass an object to check the tree recursively for its correctness.

Take a look at the `example/` folder or the API, to get an overview into `tb` and its nature.

Inspiration: [Symfony - Defining and Processing Configuration Values](http://symfony.com/doc/current/components/config/definition.html)

[API](https://github.com/MrBoolean/tb/blob/master/API.md) | [Changelog](https://github.com/MrBoolean/tb/blob/master/Changelog.md) | [Documentation](http://mrboolean.github.io/tb/)

## Install
```bash
npm install tb
```

## Example
[![Example](https://github.com/MrBoolean/tb/blob/master/example/run.gif)](https://github.com/MrBoolean/tb/blob/master/example/)

```javascript
var builder = require('tb');
var definition = builder('package');
var result;

definition
  .children()
    .stringNode('name')
      .isRequired()
      .description('The package name')
    .end()
    .objectNode('developer')
      .children()
        .stringNode('name').isRequired().end()
        .stringNode('email').isRequired().end()
        .numberNode('age')
          .isGreaterOrEqualThan(18)
        .end()
      .end()
    .end()
  .end()
;

try {
  result = definition.deploy({
    name: 'tb',
    developer: {
      name: 'Jon Doe',
      email: 'jon@doe.com'
    }
  });
} catch (error) {
  console.error(error.path + ': ' + error.message);
}
```

## CLI
### `tb doc <sources...> -o output [-v]`
Generates the documentation for the given configuration tb files.

#### Example
```bash
tb example/generate-documentation/source-a.js example/generate-documentation/source-b.js -o dist/generated-documentation -v
```

## Contribute
You want to help us? Cool, thanks!

It ist important to watch the given coding standards and to implement them.

At bottom it is very simple.

1. Checkout of the repository.
2. Run `npm install`.
3. Define the content and write some test for it.
4. Implement the new functionality.
5. Run `gulp test`
6. Create a pull-request

## License
The MIT License (MIT)

Copyright (c) 2014 - 2015 Marc Binder <marcandrebinder@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
