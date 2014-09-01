module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'mocha_istanbul': {
            coverage: {
                src: 'test/',
                options: {
                    root: './lib',
                    reportFormats: ['lcovonly', 'html'],
                    coverageFolder: './dist',
                    mochaOptions: ['--recursive']
                }
            }
        },
        'istanbul_check_coverage': {
            'default': {
                options: {
                    coverageFolder: './dist/*',
                    check: {
                        lines: 80,
                        statements: 80
                    }
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
        },
        watch: {
            project: {
                files: ['./lib/**/*.js', './test/**/*.js'],
                tasks: ['jshint:standard', 'mocha_istanbul:coverage']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-codeclimate-reporter');

    grunt.registerTask('default', ['jshint:standard', 'test']);
    grunt.registerTask('test', ['mocha_istanbul:coverage', 'codeclimate:coverage']);

    grunt.registerTask('dev', ['watch']);
};