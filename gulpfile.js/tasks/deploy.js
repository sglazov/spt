const gulp    = require('gulp');
const ghPages = require('gulp-gh-pages');


gulp.task('push', function () {
  return gulp.src("dist/**/*")
    .pipe(ghPages())
});
