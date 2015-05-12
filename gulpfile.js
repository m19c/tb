var gulp = require('gulp'),
    tdd  = require('gulp-mocha-tdd');

gulp.task('test', function () {
  tdd(gulp, {
    rootTestsDir: true,
    testsDirName: 'test',
    scriptsDirName: 'lib',
    init: function() {
      global.expect = require('chai').expect;
    }
  });
});