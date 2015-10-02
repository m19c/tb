var chai = require('chai');
var assert = chai.assert;
var Tree = require('../lib/tree');
var Condition = require('../lib/condition');

describe('Tree', function() {
  describe('validate', function() {
    it('should throw an error if the obtained validator returns false', function() {
      assert.throws(function() {
        var builder = new Tree('should_throw');

        builder
          .children()
            .stringNode('example')
              .validator(function() {
                return false;
              })
            .end()
          .end()
        ;

        builder.deploy({ example: 'some' });
      }, 'Validation failed');
    });

    it('should throw an error if the custom validation fails', function() {
      assert.throws(function() {
        var builder = new Tree('should_throw');

        builder
          .children()
            .stringNode('example')
              .validator(function() {
                throw new Error('Invalid example');
              })
            .end()
          .end()
        ;

        builder.deploy({ example: 'test' });
      }, 'Invalid example');
    });

    it('throws an error if the condition of an ifValidator fails', function() {
      assert.throws(function() {
        var builder = new Tree('should_throw');

        builder
          .children()
            .stringNode('example')
              .validatorIf(
                function condition() {
                  throw new Error('Condition failed');
                },
                function validator() {}
              )
            .end()
          .end()
        ;

        builder.deploy({ example: 'some' });
      }, 'Condition failed');
    });

    it('throws an error if the ifValidator fails', function() {
      assert.throws(function() {
        var builder = new Tree('should_throw');

        builder
          .children()
            .stringNode('example')
              .validatorIf(
                function condition() {
                  return true;
                },
                function validator() {
                  throw new Error('Invalid example');
                }
              )
            .end()
          .end()
        ;

        builder.deploy({ example: 'some' });
      }, 'Invalid example');
    });

    it('throws an error if the ifValidator returns `false`', function() {
      assert.throws(function() {
        var builder = new Tree('should_throw');

        builder
          .children()
            .stringNode('example')
              .validatorIf(
                function condition() {
                  return true;
                },
                function validator() {
                  return false;
                }
              )
            .end()
          .end()
        ;

        builder.deploy({ example: 'some' });
      }, 'Validation failed');
    });

    it('should forward errors', function() {
      assert.throws(function() {
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

    it('should also work with nested arrays', function() {
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

    it('should also throw the too few keys error if the obtained nested object is invalid', function() {
      assert.throws(function() {
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

    it('should throw an error if too few keys where passed', function() {
      assert.throws(function() {
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

    it('should throw an error if too few keys where passed (recursive)', function() {
      assert.throws(function() {
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

    it('should also work with a valid configuration', function() {
      var builder = new Tree('valid_config');
      var config;

      builder
        .children()
          .stringNode('name').isRequired().end()
          .stringNode('version')
            .isRequired()
            .validator(function(key, value) {
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

    it('should throw an error if the obtained type is not allowed', function() {
      var builder = new Tree('invalid_config');

      builder
        .children()
          .stringNode('name').isRequired().end()
        .end();

      assert.throws(function() {
        builder.deploy({
          name: false
        });
      });
    });

    describe('booleanNode', function() {
      var builder = new Tree('test_booleanNode');

      builder
        .children()
          .booleanNode('enabled')
            .isRequired()
          .end()
        .end();

      it('should throw an error if the required parameter "enabled" is not passed', function() {
        assert.throws(function() {
          builder.deploy({});
        });
      });
    });

    describe('functionNode', function() {
      var builder = new Tree('test_function');

      builder
        .children()
          .functionNode('callback')
            .isRequired()
          .end()
        .end();

      it('should throw an error if the required parameter "callback" is not passed', function() {
        assert.throws(function() {
          builder.deploy({});
        });
      });
    });

    describe('mixedNode', function() {
      var builder = new Tree('test_mixedNode');

      builder
        .children()
          .mixedNode('something')
            .isRequired()
          .end()
        .end();

      it('should throw an error if the required parameter "something" is not passed', function() {
        assert.throws(function() {
          builder.deploy({});
        });
      });

      describe('sanitizer', function() {
        it('throws an error if the sanitizer throws an error', function() {
          assert.throws(function() {
            var sanitize = new Tree('sanitize');

            sanitize
              .children()
                .mixedNode('flag')
                  .isRequired()
                  .sanitizer(function() {
                    throw new Error('Something went wrong');
                  })
                .end()
              .end()
            ;

            sanitize.deploy({ flag: 1 });
          }, 'Something went wrong');
        });

        it('sanitizes the value', function() {
          var sanitize = new Tree('sanitize');
          var config;

          sanitize
            .children()
              .mixedNode('flag')
                .isRequired()
                .sanitizer(function(value) {
                  return parseInt(value, 10) * 3.14;
                })
              .end()
            .end()
          ;

          config = sanitize.deploy({ flag: '1337' });
          assert.strictEqual(config.flag, 4198.18);
        });
      });
    });

    describe('numberNode', function() {
      var builder = new Tree('test_numberNode');

      builder
        .children()
          .numberNode('age')
            .isRequired()
          .end()
        .end();

      it('should throw an error if the required parameter "age" is not passed', function() {
        assert.throws(function() {
          builder.deploy({});
        });
      });
    });

    describe('stringNode', function() {
      var builder = new Tree('test_stringNode');

      builder
        .children()
          .stringNode('name')
            .isRequired()
          .end()
        .end();

      it('should throw an error if the required parameter "name" is not passed', function() {
        assert.throws(function() {
          builder.deploy({});
        });
      });
    });

    describe('variableObjectNode', function() {
      var builder = new Tree('test_variableObjectNode');

      builder
        .children()
          .variableObjectNode('data')
            .isRequired()
          .end()
        .end();

      it('should throw an error if the required parameter "data" is not passed', function() {
        assert.throws(function() {
          builder.deploy({});
        });
      });
    });
  });

  describe('conditions', function() {
    var builder;

    beforeEach(function() {
      builder = new Tree('condition_tree');
    });

    it('`when`, `ifTrue`, `ifString`, `ifNull`, `ifArray`, `ifNotInArray`, `ifInArray` and `always` returns a instance of `Condition`', function() {
      assert.instanceOf(builder.children().mixedNode('when').when(function() {}), Condition);
      assert.instanceOf(builder.children().mixedNode('ifTrue').ifTrue(), Condition);
      assert.instanceOf(builder.children().mixedNode('ifString').ifString(), Condition);
      assert.instanceOf(builder.children().mixedNode('ifNull').ifNull(), Condition);
      assert.instanceOf(builder.children().mixedNode('ifArray').ifArray(), Condition);
      assert.instanceOf(builder.children().mixedNode('ifNotInArray').ifNotInArray(), Condition);
      assert.instanceOf(builder.children().mixedNode('ifInArray').ifInArray(), Condition);
      assert.instanceOf(builder.children().mixedNode('always').always(), Condition);
    });

    describe('when', function() {
      it('adds the correct condition behavior', function() {
        function behavior() {}
        builder.children().mixedNode('test').when(behavior);
        assert.deepPropertyVal(builder, 'context.data.test.options.conditions[0].options.condition', behavior);
      });
    });

    describe('ifTrue', function() {
      it('adds the correct condition behavior', function() {
        var behavior;

        builder.children().mixedNode('test').ifTrue();
        assert.deepProperty(builder, 'context.data.test.options.conditions[0].options.condition');

        behavior = builder.context.data.test.options.conditions[0].options.condition;
        assert.isFunction(behavior);
        assert.isTrue(behavior(true));
        assert.isFalse(behavior(false));
      });
    });

    describe('ifString', function() {
      it('adds the correct condition behavior', function() {
        var behavior;

        builder.children().mixedNode('test').ifString();
        assert.deepProperty(builder, 'context.data.test.options.conditions[0].options.condition');

        behavior = builder.context.data.test.options.conditions[0].options.condition;
        assert.isFunction(behavior);
        assert.isTrue(behavior('some'));
        assert.isFalse(behavior(1337));
      });
    });

    describe('ifNull', function() {
      it('adds the correct condition behavior', function() {
        var behavior;

        builder.children().mixedNode('test').ifNull();
        assert.deepProperty(builder, 'context.data.test.options.conditions[0].options.condition');

        behavior = builder.context.data.test.options.conditions[0].options.condition;
        assert.isFunction(behavior);
        assert.isTrue(behavior(null));
        assert.isFalse(behavior(1337));
      });
    });

    describe('ifArray', function() {
      it('adds the correct condition behavior', function() {
        var behavior;

        builder.children().mixedNode('test').ifArray();
        assert.deepProperty(builder, 'context.data.test.options.conditions[0].options.condition');

        behavior = builder.context.data.test.options.conditions[0].options.condition;
        assert.isFunction(behavior);
        assert.isTrue(behavior([]));
        assert.isFalse(behavior(1337));
      });
    });

    describe('ifNotInArray', function() {
      it('adds the correct condition behavior', function() {
        var behavior;

        builder.children().mixedNode('test').ifNotInArray([1]);
        assert.deepProperty(builder, 'context.data.test.options.conditions[0].options.condition');

        behavior = builder.context.data.test.options.conditions[0].options.condition;
        assert.isFunction(behavior);
        assert.isTrue(behavior([2]));
        assert.isFalse(behavior([1]));
      });
    });

    describe('ifInArray', function() {
      it('adds the correct condition behavior', function() {
        var behavior;

        builder.children().mixedNode('test').ifInArray([1]);
        assert.deepProperty(builder, 'context.data.test.options.conditions[0].options.condition');

        behavior = builder.context.data.test.options.conditions[0].options.condition;
        assert.isFunction(behavior);
        assert.isTrue(behavior([1]));
        assert.isFalse(behavior([2]));
      });
    });

    describe('always', function() {
      it('is called "always"', function() {
        var behavior;

        builder.children().mixedNode('test').always();
        assert.deepProperty(builder, 'context.data.test.options.conditions[0].options.condition');

        behavior = builder.context.data.test.options.conditions[0].options.condition;
        assert.isFunction(behavior);
        assert.isTrue(behavior([]));
        assert.isTrue(behavior(1337));
      });

      it('calls `then(callback)`', function() {
        builder.children().mixedNode('name').always().then(function() {
          return 1;
        });

        assert.deepEqual(builder.deploy({ name: 'Jon' }), { name: 1 });
      });

      it('calls `thenNull()`', function() {
        builder.children().mixedNode('name').always().thenNull();

        assert.deepEqual(builder.deploy({ name: 'Jon' }), { name: null });
      });

      it('calls `thenEmptyArray()`', function() {
        builder.children().mixedNode('name').always().thenEmptyArray();

        assert.deepEqual(builder.deploy({ name: 'Jon' }), { name: [] });
      });

      it('calls `thenEmptyObject()`', function() {
        builder.children().mixedNode('name').always().thenEmptyObject();

        assert.deepEqual(builder.deploy({ name: 'Jon' }), { name: {} });
      });

      it('calls `thenInvalid()`', function() {
        assert.throws(function() {
          builder.children().mixedNode('name').always().thenInvalid();
          builder.deploy({ name: 'Jon' });
        }, 'Marked as invalid');
      });

      it('calls `thenDelete()`', function() {
        builder.children().mixedNode('name').always().thenDelete();

        assert.deepEqual(builder.deploy({ name: 'Jon' }), {});
      });
    });
  });
});