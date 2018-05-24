const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const debug = require('gulp-debug');
const runSequence = require('run-sequence');

const paths = require('../paths');
const errorHandler = require('../errorHandler');


// Копируем файлы в корень проекта
gulp.task('resources', function() {
  return gulp.src(paths.source.resources)
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(changed(paths.build.resources))
    .pipe(debug({title: 'resources:'}))
    .pipe(gulp.dest(paths.build.resources));
});

// Копируем статичные файлы
gulp.task('copy', function(cb) {
  return runSequence(
    ['images', 'images:blocks', 'resources'],
    cb
  );
});
