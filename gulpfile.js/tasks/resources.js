const gulp        = require('gulp');
const plumber     = require('gulp-plumber');
const changed     = require('gulp-changed');
const debug       = require('gulp-debug');
const runSequence = require('run-sequence');

const config      = require('../config');


// Копируем файлы в корень проекта
gulp.task('resources', function() {
  return gulp.src(config.source.resources)
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(changed(config.build.resources))
    .pipe(debug({title: 'resources:'}))
    .pipe(gulp.dest(config.build.resources));
});

// Копируем статичные файлы
gulp.task('copy', function(cb) {
  return runSequence(
    ['images', 'images:blocks', 'resources'],
    cb
  );
});
