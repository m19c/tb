# API
* [`mixedNode(key)`](#mixednodekey)
  * [`isRequired()`](#isrequired)
  * [`defaultValue(value)`](#defaultvaluevalue)
  * [`validator(callback)`](#validatorcallback)
  * [`validatorIf(condition, validator)`](#)
  * [`sanitizer(callback)`](#)
  * [`when(condition)`](#)
  * [`ifTrue()`](#)
  * [`ifString()`](#)
  * [`ifNull()`](#)
  * [`ifArray()`](#)
  * [`ifNotInArray(values)`](#)
  * [`ifInArray(values)`](#)
  * [`always()`](#)
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
* [`functionNode(key)`](#)
* [`variableObjectNode(key)`](#)
* Condition
  * [`then(callback)`](#)
  * [`thenNull()`](#)
  * [`thenEmptyArray()`](#)
  * [`thenEmptyObject()`](#)
  * [`thenInvalid()`](#)
  * [`thenDelete()`](#)

## `mixedNode(key)`
### `validator(callback)`
Setup the validator callback.

### `isRequired()`
Elaborates that the defined parameter has to be occupied.

### `defaultValue(value)`
Defines the default-`value`.

### `validatorIf(condition, validator)`
...

### `sanitizer(callback)`
...

### `when(condition)`
...

### `ifTrue()`
...

### `ifString()`
...

### `ifNull()`
...

### `ifArray()`
...

### `ifNotInArray(values)`
...

### `ifInArray(values)`
...

### `always()`
...

**[⬆](#api)**

## `objectNode(key)`

**[⬆](#api)**

## `arrayNode(key)`
### `hasKey(key)`
Defines that the defined array has to contain the declared `key`.

### `lengthOf(value)`
Defines the length of the array.

### `minLength(value)`
Defines the minimal length of the array.

### `maxLength(value)`
Defines the maximal length of the array.

**[⬆](#api)**

## `functionNode(key)`
See `global`.

## `stringNode(key)`
### `regExpToBeTruly(regEx)`
Expects that the committed RegEx is tested positiv.

### `regExpToBeFalsely(regEx)`
Expects that the committed RegEx is tested negativ.

### `minLength(value)`
Defines the minimal length.

### `maxLength(value)`
Defines the maximal length.

**[⬆](#api)**

## `numberNode(key)`
### `isGreaterThan(value)`
Expects that the merit is bigger as `value`.

### `isLowerThan(value)`
Expects that the merit is smaller as `value`.

### `isGreaterOrEqualThan(value)`
Expects the merit to be greater or equal to `value`.

### `isLowerOrEqualThan(value)`
Expects the merit to be smaller or equal to `value`.

### `isEqualTo(value)`
Expects the merit to be equal to `value`.

**[⬆](#api)**

## `booleanNode(key)`
### `expectToBeTrue()`
Expects 'true`.

### `expectToBeFalse()`
Expects `false`.

**[⬆](#api)**

## Condition
### `then(callback)`
### `thenNull()`
### `thenEmptyArray()`
### `thenEmptyObject()`
### `thenInvalid()`
### `thenDelete()`

**[⬆](#api)**