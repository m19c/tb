var chai   = require('chai'),
    assert = chai.assert,
    Tree   = require('./../lib/tree');

describe('tree', function () {
  'use strict';

  describe('validate', function () {
    it('should throw an error if the obtained validator does not return an array with two arguments', function () {
      var expectedErrorMessage = 'To validate your configuration you need to return an array with two ' +
                     'arguments (key as well as value). Please update the response of the ' +
                     'validator "example"';

      assert.throws(function () {
        var builder = new Tree('should_throw');

        builder
          .children()
            .stringNode('example')
              .validator(function () {})
            .end()
          .end();

        builder.deploy({ example: 'some' });
      }, expectedErrorMessage);
    });

    it('should throw an error if the custom validation fails', function () {
      assert.throws(function () {
        var builder = new Tree('should_throw');

        builder
          .children()
            .stringNode('example')
              .validator(function () {
                throw new Error('Invalid example');
              })
            .end()
          .end();

        builder.deploy({ example: 'test' });
      }, 'Invalid example');
    });

    it('should forward errors', function () {
      assert.throws(function () {
        var builder = new Tree('forward_it');

        builder
          .children()
            .objectNode('user')
              .children()
                .stringNode('name')
                  .isRequired()
                .end()
              .end()
            .end()
          .end();

        builder.deploy({ user: {} });
      }, 'Undefined configuration "forward_it.user.name"');
    });

    it('should also work with nested arrays', function () {
      var builder = new Tree('nested_array');

      builder
        .children()
          .arrayNode('users')
            .minLength(1)
            .nestedObject()
              .stringNode('name').isRequired().end()
            .end()
          .end()
        .end();

      builder.deploy({
        users: [
          { name: 'Jon Doe' }
        ]
      });
    });

    it('should also throw the too few keys error if the obtained nested object is invalid', function () {
      assert.throws(function () {
        var builder = new Tree('nested_array_should_throw');

        builder
          .children()
            .arrayNode('users')
              .minLength(1)
              .nestedObject()
                .stringNode('name').isRequired().end()
              .end()
            .end()
          .end();

        builder.deploy({
          users: [
            { name: 'Jon Doe', tooFew: 'some' }
          ]
        });
      }, 'Too few keys - tooFew');
    });

    it('should throw an error if too few keys where passed', function () {
      assert.throws(function () {
        var builder = new Tree('few_argument');

        builder
          .children()
            .stringNode('name').end()
          .end();

        builder.deploy({
          name: 'Some',
          version: '1.0.0'
        });
      });
    }, 'Too few keys - version');

    it('should throw an error if too few keys where passed (recursive)', function () {
      assert.throws(function () {
        var builder = new Tree('few_argument');

        builder
          .children()
            .stringNode('name').end()
            .variableObjectNode('something').end()
            .objectNode('data')
              .children()
                .stringNode('version').end()
              .end()
            .end()
          .end();

        builder.deploy({
          name: 'Some',
          xxx: '1.0.0',
          data: {
            cool: true
          }
        });
      }, 'Too few keys - cool, xxx');
    });

    it('should also work with a valid configuration', function () {
      var builder = new Tree('valid_config'),
        config;

      builder
        .children()
          .stringNode('name').isRequired().end()
          .stringNode('version')
            .isRequired()
            .validator(function (key, value) {
              return [key, value];
            })
          .end()
          .booleanNode('deploy').end()
          .arrayNode('keywords').minLength(1).end()
          .variableObjectNode('scripts').end()
          .objectNode('author')
            .children()
              .stringNode('name').isRequired().end()
              .stringNode('email').end()
            .end()
          .end()
        .end();

      try {
        config = builder.deploy({
          name: 'my-valid-config',
          version: '1.0.0',
          keywords: ['awesome'],
          deploy: false,
          scripts: {
            some: 'script'
          },
          author: {
            name: 'Jon Doe'
          }
        });
      } catch (error) {
        throw new chai.AssertionError(error.message + ' (' + error.path + ')', {}, assert.fail);
      }

      assert.strictEqual(config.name, 'my-valid-config');
      assert.strictEqual(config.version, '1.0.0');
      assert.isTrue(config.keywords.length === 1);
      assert.strictEqual(config.keywords[0], 'awesome');
      assert.typeOf(config.scripts, 'object');
    });

    it('should throw an error if the obtained type is not allowed', function () {
      var builder = new Tree('invalid_config');

      builder
        .children()
          .stringNode('name').isRequired().end()
        .end();

      assert.throws(function () {
        builder.deploy({
          name: false
        });
      });
    });

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