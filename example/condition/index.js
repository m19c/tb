var tb = require('../../');
var definition;

definition = tb('my_config');

definition
  .children()
    .stringNode('location')
      .when(function(value) { return value === 'Ostdeutschland'; })
        .thenInvalid()
      .end()
    .end()
  .end()
;


try {
  definition.deploy({
    location: 'Ostdeutschland'
  });
} catch (err) {
  console.error(err.path.join('.') + ':', err.message);
}