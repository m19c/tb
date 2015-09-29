var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');
var codeclimate = require('gulp-codeclimate-reporter');
var sequence = require('gulp-sequence');

gulp.task('lint', function lint() {
  return gulp
    .src(['index.js', 'gulpfile.js', 'lib/**/*.js', 'test/**/*.test.js', 'example/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  ;
});

gulp.task('test.instrument', function instrument() {
  return gulp
    .src(['lib/**/*.js', 'index.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
  ;
});

gulp.task('test', ['test.instrument'], function test() {
  return gulp
    .src(['test/**/*.test.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      dir: './dist/report'
    }))
  ;
});

gulp.task('codeclimate', function sendToCodeclimate() {
  return gulp
    .src(['dist/report/lcov.info'], { read: false })
    .pipe(codeclimate({
      token: 'e03fa9d97578203b90dbcf47d15aae799c64e1c21c4383ea3b7240084e48ad90'
    }))
  ;
});

gulp.task('default', sequence(['lint', 'test'], 'codeclimate'));