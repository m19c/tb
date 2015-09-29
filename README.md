# `tb`
[![Code Climate](https://codeclimate.com/github/MrBoolean/tb/badges/gpa.svg)](https://codeclimate.com/github/MrBoolean/tb) [![Test Coverage](https://codeclimate.com/github/MrBoolean/tb/badges/coverage.svg)](https://codeclimate.com/github/MrBoolean/tb) [![Build Status](https://travis-ci.org/MrBoolean/tb.svg?branch=master)](https://travis-ci.org/MrBoolean/tb) [![Dependency Status](https://gemnasium.com/MrBoolean/tb.svg)](https://gemnasium.com/MrBoolean/tb)
[![Version](https://badge.fury.io/js/tb.svg)](https://www.npmjs.org/package/tb)

[![NPM](https://nodei.co/npm/tb.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/tb/)

> Sometimes it is necessary to specialize the configuration. Not because you're totally into strict application, but because sometimes you will allow third-party-implementations.

The `tb` (known as `tree-builder`) allows the developer to specialize a configuration fast and without problems through an easy API.

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

## The API
* [`mixedNode(key)`](#mixednodekey)
  * [`isRequired()`](#isrequired)
  * [`defaultValue(value)`](#defaultvaluevalue)
  * [`validator(callback)`](#validatorcallback)
* [`arrayNode(key)`](#arraynodekey)
  * [`hasKey(key)`](#haskeykey)
  * [`lengthOf(value)`](#lengthofvalue)
  * [`minLength(value)`](#minlengthvalue)
  * [`maxLength(value)`](#maxlengthvalue)
* [`stringNode(key)`](#stringnodekey)
  * [`regExpToBeTruly(regEx)`](#regexptobetrulyregex)
  * [`regExpToBeFalsely(regEx)`](#regexptobefalselyregex)
  * [`minLength(value)`](#minlengthvalue-1)
  * [`maxLength(value)`](#maxlengthvalue-1)
* [`numberNode(key)`](#numbernodekey)
  * [`isGreaterThan(value)`](#isgreaterthanvalue)
  * [`isLowerThan(value)`](#islowerthanvalue)
  * [`isGreaterOrEqualThan(value)`](#isgreaterorequalthanvalue)
  * [`isLowerOrEqualThan(value)`](#islowerorequalthanvalue)
  * [`isEqualTo(value)`](#isequaltovalue)
* [`booleanNode(key)`](#booleannodekey)
  * [`expectToBeTrue()`](#expecttobetrue)
  * [`expectToBeFalse()`](#expecttobefalse)
* `functionNode(key)`
* `variableObjectNode(key)`

### `mixedNode(key)`
#### `validator(callback)`
Setup the validator callback.

#### `isRequired()`
Elaborates that the defined parameter has to be occupied.

#### `defaultValue(value)`
Defines the default-`value`.

### `objectNode(key)`

### `arrayNode(key)`
#### `hasKey(key)`
Defines that the defined array has to contain the declared `key`.

#### `lengthOf(value)`
Defines the length of the array.

#### `minLength(value)`
Defines the minimal length of the array.

#### `maxLength(value)`
Defines the maximal length of the array.

### `functionNode(key)`
See `global`.

### `stringNode(key)`
#### `regExpToBeTruly(regEx)`
Expects that the committed RegEx is tested positiv.

#### `regExpToBeFalsely(regEx)`
Expects that the committed RegEx is tested negativ.

#### `minLength(value)`
Defines the minimal length.

#### `maxLength(value)`
Defines the maximal length.

### `numberNode(key)`
#### `isGreaterThan(value)`
Expects that the merit is bigger as `value`.

#### `isLowerThan(value)`
Expects that the merit is smaller as `value`.

#### `isGreaterOrEqualThan(value)`
Expects the merit to be greater or equal to `value`.

#### `isLowerOrEqualThan(value)`
Expects the merit to be smaller or equal to `value`.

#### `isEqualTo(value)`
Expects the merit to be equal to `value`.

### `booleanNode(key)`
#### `expectToBeTrue()`
Expects 'true`.

#### `expectToBeFalse()`
Expects `false`.

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
