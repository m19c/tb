var ConfigError = require('./../lib/error'),
    assert      = require('chai').assert;

describe('ConfigError', function () {
    'use strict';

    it('should contain `message`, `name` as well as `path`', function () {
        var message = 'Something went wrong',
            path    = 'this.is.my.path';

        try {
            throw new ConfigError(message, path);
        } catch (error) {
            assert.strictEqual(error.message, message);
            assert.strictEqual(error.path, path);
            assert.strictEqual(error.name, 'ConfigError');
        }
    });
});