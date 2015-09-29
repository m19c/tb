module.exports = function(program) {
  program
    .command('build <sources...>')
    .description('run setup')
    .option('-o, --output [output]')
    .action(function(sources, options) {
      if (!options.output) {
        throw new Error('No output directory specified');
      }

      console.log(sources);
    })
  ;
};