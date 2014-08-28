module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'mocha_istanbul': {
            coverage: {
                src: 'test',
                options: {
                    coverage: true,
                    root: './lib',
                    reportFormats: ['lcovonly'],
                    coverageFolder: './dist'
                }
            }
        },
        codeclimate: {
            coverage: {
                options: {
                    file: 'dist/lcov.info',
                    token: 'ec3ee6b4447b58b59a914d887acfef6706a0a072b36188b254fa54f48d24b9a5'
                }
            }
        },
        jshint: {
            standard: {
                files: {
                    src: ['lib/**/*.js', 'test/**/*.js']
                },
                options: {
                    jshintrc: __dirname + '/.jshintrc'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-codeclimate-reporter');

    grunt.registerTask('default', ['jshint:standard', 'test']);
    grunt.registerTask('test', ['mocha_istanbul:coverage', 'codeclimate:coverage']);
};