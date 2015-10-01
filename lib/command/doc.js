var util = require('util');
var Promise = require('bluebird');
var mkdirp = Promise.promisify(require('mkdirp'));
var path = require('path');
var fs = require('mz/fs');
var hbs = require('handlebars');
var chalk = require('chalk');
var Tree = require('../tree');
var prepareEach = require('./doc/prepare-each');

module.exports = function exportProgram(program) {
  program
    .command('doc <sources...>')
    .description('run setup')
    .option('-o, --output [output]')
    .option('-v, --verbose')
    .action(function generate(sources, options) {
      function log() {
        if (!options.verbose) {
          return;
        }

        console.log.bind(console).apply(this, arguments);
      }

      options.output = (path.isAbsolute(options.output)) ? options.output : path.join(process.cwd(), options.output);

      (function checkOptions() {
        if (!options.output) {
          return Promise.reject(new Error('No output directory specified'));
        }

        return Promise.resolve();
      })()
        .then(function collect() {
          return Promise.all(sources.map(function fileToPromise(file) {
            file = (path.isAbsolute(file)) ? file : path.join(process.cwd(), file);

            return Promise.props({
              isPresent: fs.exists(file),
              file: file
            });
          }));
        })
        .then(function handleInfo(infos) {
          return Promise.all(infos.map(function loadFileContent(info) {
            log(chalk.blue('Get file info for "%s"'), info.file);

            return {
              file: info.file,
              context: require(info.file)
            };
          }));
        })
        .then(function process(infos) {
          var result = {};
          var index;
          var info;

          for (index = 0; index < infos.length; index++) {
            if (!infos[index]) {
              continue;
            }

            info = infos[index];

            if (!(info.context instanceof Tree)) {
              return Promise.reject(new Error(util.format('The file "%s" must export a instance of `tb`', info.file)));
            }

            result[info.file] = prepareEach(info.context.context.data);
          }

          return result;
        })
        .then(function exportData(data) {
          return Promise.props({
            context: {
              cwd: process.cwd(),
              data: data
            },
            main: fs.readFile(path.join(__dirname, '..', 'resource', 'index.hbs'), 'utf8'),
            partial: fs.readFile(path.join(__dirname, '..', 'resource', 'tree.hbs'), 'utf8')
          });
        })
        .then(function write(result) {
          var template;

          log(chalk.blue('Building the tree...'));

          hbs.registerPartial('tree', result.partial);
          template = hbs.compile(result.main);

          return mkdirp(options.output)
            .then(function toFile() {
              return Promise.all([
                fs.writeFile(path.join(options.output, 'index.html'), template(result.context))
              ]);
            })
          ;
        })
        .then(function done() {
          log(chalk.bgGreen.white.bold(' DONE '));
        })
        .catch(function rethrow(err) {
          log(chalk.bgRed.white.bold(err.message));
        })
      ;
    })
  ;
};