var tb = require('./../../');
var definition = tb('source-a');

definition
  .children()
    .stringNode('firstname')
      .description('The customers `firstname`')
      .isRequired()
    .end()
    .stringNode('lastname')
      .description('The customers `lastname`')
      .isRequired()
    .end()
    .arrayNode('children')
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