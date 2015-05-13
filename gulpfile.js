var gulp  = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function () {
  gulp
    .src('test/**/*.test.js', { read: false })
    .pipe(mocha({
      reporter: 'nyan'
    }))
  ;
});