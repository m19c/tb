module.exports = function (program) {
  'use strict';

  program
    .command('build <paths...>')
    .description('run setup commands for all envs')
    .option('-o, --output [output]')
    .action(function(paths, options){
      console.log(paths);
    })
  ;
};