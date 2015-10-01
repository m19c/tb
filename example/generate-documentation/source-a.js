var tb = require('./../../');
var definition = tb('source-a');

definition
  .children()
    .stringNode('firstname')
      .description('The customers `firstname`')
      .validator(function myFirstnameValidator(value) {
        return value.length > 0;
      })
      .isRequired()
    .end()
    .stringNode('lastname')
      .description('The customers `lastname`')
      .isRequired()
    .end()
    .arrayNode('children')
      .description('The children of the current person')
      .minLength(1)
      .nestedObject()
        .stringNode('firstname')
          .description('The customers child `firstname`')
          .isRequired()
        .end()
        .stringNode('lastname')
          .description('The customers child `lastname`')
          .isRequired()
        .end()
      .end()
    .end()
  .end()
;

module.exports = definition;