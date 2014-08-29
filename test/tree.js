var assert = require('chai').assert,
    Tree   = require('./../lib/tree');

describe('tree', function () {
    'use strict';

    describe('validate', function () {
        describe('booleanNode', function () {
            var builder = new Tree('test_booleanNode');

            builder
                .children()
                    .booleanNode('enabled')
                        .isRequired()
                    .end()
                .end();

            it('should throw an error if the required parameter "enabled" is not passed', function () {
                assert.throws(function () {
                    builder.deploy({});
                });
            });
        });

        describe('functionNode', function () {
            var builder = new Tree('test_function');

            builder
                .children()
                    .functionNode('callback')
                        .isRequired()
                    .end()
                .end();

            it('should throw an error if the required parameter "callback" is not passed', function () {
                assert.throws(function () {
                    builder.deploy({});
                });
            });
        });

        describe('mixedNode', function () {
            var builder = new Tree('test_mixedNode');

            builder
                .children()
                    .mixedNode('something')
                        .isRequired()
                    .end()
                .end();

            it('should throw an error if the required parameter "something" is not passed', function () {
                assert.throws(function () {
                    builder.deploy({});
                });
            });
        });

        describe('numberNode', function () {
            var builder = new Tree('test_numberNode');

            builder
                .children()
                    .numberNode('age')
                        .isRequired()
                    .end()
                .end();

            it('should throw an error if the required parameter "age" is not passed', function () {
                assert.throws(function () {
                    builder.deploy({});
                });
            });
        });

        describe('stringNode', function () {
            var builder = new Tree('test_stringNode');

            builder
                .children()
                    .stringNode('name')
                        .isRequired()
                    .end()
                .end();

            it('should throw an error if the required parameter "name" is not passed', function () {
                assert.throws(function () {
                    builder.deploy({});
                });
            });
        });

        describe('variableObjectNode', function () {
            var builder = new Tree('test_variableObjectNode');

            builder
                .children()
                    .variableObjectNode('data')
                        .isRequired()
                    .end()
                .end();

            it('should throw an error if the required parameter "data" is not passed', function () {
                assert.throws(function () {
                    builder.deploy({});
                });
            });
        });
    });
});