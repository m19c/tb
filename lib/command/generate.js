var util = require('util');
var Promise = require('bluebird');
var mkdirp = Promise.promisify(require('mkdirp'));
var path = require('path');
var mz = require('mz/fs');
var fs = require('fs');
var Tree = require('../tree');
var merge = require('lodash.merge');
var jade = require('jade');
var resourcePath = path.join(__dirname, '..', 'resource');

module.exports = function exportProgram(program) {
  program
    .command('generate <sources...>')
    .description('run setup')
    .option('-o, --output [output]')
    .action(function generate(sources, options) {
      if (!options.output) {
        throw new Error('No output directory specified');
      }

      options.output = (path.isAbsolute(options.output)) ? options.output : path.join(process.cwd(), options.output);

      Promise.all(sources.map(function fileToPromise(file) {
        file = (path.isAbsolute(file)) ? file : path.join(process.cwd(), file);
        return Promise.props({
          isPresent: mz.exists(file),
          file: file
        });
      }))
        .then(function handleInfo(infos) {
          return Promise.all(infos.map(function loadFileContent(info) {
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

          function walk(item) {
            var data = {};
            var key;
            var spec;

            for (key in item) {
              if (!item[key]) {
                continue;
              }

              spec = item[key];

              data[key] = data[key] || { _children: null };
              data[key]._info = merge({}, { type: spec.type }, spec.options);

              if (spec.context && spec.context.data) {
                data[key]._children = walk(spec.context.data);
              }
            }

            return data;
          }

          for (index = 0; index < infos.length; index++) {
            if (!infos[index]) {
              continue;
            }

            info = infos[index];

            if (!(info.context instanceof Tree)) {
              return Promise.reject(new Error(util.format('The file "%s" must export a instance of `tb`', info.file)));
            }

            result[info.file] = walk(info.context.context.data);
          }

          return result;
        })
        .then(function exportData(data) {
          return {
            cwd: process.cwd(),
            data: data
          };
        })
        .then(function write(content) {
          function copy(file) {
            return new Promise(function(resolve, reject) {
              fs.createReadStream(path.join(resourcePath, file))
                .pipe(fs.createWriteStream(path.join(options.output, file)))
                .on('end', resolve)
                .on('error', reject)
              ;
            });
          }

          return mkdirp(options.output)
            .then(function toFile() {
              return Promise.all([
                mz.writeFile(path.join(options.output, 'index.html'), jade.renderFile(path.join(resourcePath, 'index.jade'), {
                  context: content
                })),
                copy('app.js')
              ]);
            })
          ;
        })
        .catch(function rethrow(err) {
          throw err;
        })
      ;
    })
  ;
};