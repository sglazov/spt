const gulp = require('gulp');
const deploy = require('gulp-gh-pages');

const paths = require('../paths');
const errorHandler = require('../errorHandler');


gulp.task('deploy', function () {
  return gulp.src("dist/**/*")
    .pipe(deploy())
});
