const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const fileinclude = require("gulp-file-include");

const paths = require('../paths');
const errorHandler = require('../errorHandler');


// Шаблонизация
gulp.task('html', function() {
  return gulp.src(paths.source.templates + '*.html')
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'app/templates'
    }))
    .pipe(gulp.dest(paths.build.html));
});
