var tb = require('../../');
var definition;
var config;

definition = tb('condition');

definition
  .children()
    .stringNode('firstname').isRequired().end()
    .stringNode('lastname').isRequired().end()
    .arrayNode('customers')
      .when(function justOne(value) { return value.length === 1; })
        .then(function addProperty(value) {
          value[0].golden = true;
          return value;
        })
      .end()
      .nestedObject()
        .stringNode('firstname').isRequired().end()
        .stringNode('lastname').isRequired().end()
      .end()
    .end()
  .end()
;


try {
  config = definition.deploy({
    firstname: 'Jon',
    lastname: 'Doe',
    customers: [
      {
        firstname: 'Max',
        lastname: 'Mustermann'
      }
    ]
  });

  console.log(config.customers[0].golden); // true
} catch (err) {
  console.error(err.path + ':', err.message);
}