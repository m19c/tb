module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'mocha_istanbul': {
            coverage: {
                src: 'test/*',
                options: {
                    mask: '*.js',
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
                    token: '739afa7c30a0a804f3b5c460981633e428721ddcd1de00e8b41d7caddfeaa115 '
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