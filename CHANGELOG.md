2.0.0
-----
- Now the validation-function doesn't have to redeliver the 'key' and the 'value'. Provided the validation was successful, only 'true' has to be dumped. Furthermore the developer has the opportunity to return 'false'. Therefor a default-defect note is redelivered for the current path. Equally it is possible to pitch errors directly.
- Beside the validation-function you can also give a 'sanitizer(callback)`. This function is exclaimed directly after the validation.
- The `description(value)` function was added. It can be processed by the `config-tree-builder` Command Line Interface.
- The modul `underscore` was replaced by particular `lodash` modules. As a consequence the `tb` is more slender.