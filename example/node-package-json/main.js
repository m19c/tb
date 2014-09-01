var builder     = require('./../../index'),
    definition, result;

definition = builder('my_config');

definition
    .children()
        .stringNode('name').isRequired().end()
        .stringNode('version').isRequired().end()
        .stringNode('description').end()
        .stringNode('author').end()
        .arrayNode('contributors')
            .nestedObject()
                .stringNode('name').isRequired().end()
                .stringNode('email').isRequired().end()
            .end()
        .end()
        .variableObjectNode('bin').end()
        .variableObjectNode('script').end()
        .stringNode('main').end()
        .objectNode('repository')
            .validator(function (key, value) {
                'use strict';

                return [key, value];
            })
            .children()
                .stringNode('type').end()
                .stringNode('url').end()
            .end()
        .end()
        .objectNode('bugs')
            .children()
                .stringNode('url').end()
            .end()
        .end()
        .arrayNode('keywords').end()
        .variableObjectNode('dependencies').end()
        .variableObjectNode('devDependencies').end()
        .booleanNode('preferGlobal').end()
        .booleanNode('private').defaultValue(false).end()
        .objectNode('publishConfig')
            .children()
                .stringNode('registry').end()
            .end()
        .end()
        .stringNode('subdomain').end()
        .booleanNode('analyze').defaultValue(false).end()
        .stringNode('license').end()
    .end();

try {
    result = definition.deploy(require('./input.json'));
} catch (error) {
    console.error(error.path + ': ' + error.message);
}