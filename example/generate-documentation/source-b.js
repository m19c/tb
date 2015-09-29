var tb = require('./../../');
var definition = tb('source-a');

definition
  .children()
    .stringNode('name')
      .description('The `name` of the package')
      .isRequired()
    .end()
    .stringNode('language')
      .description('The `language` e.g. `javascript` or `ruby`')
      .isRequired()
    .end()
  .end()
;

module.exports = definition;