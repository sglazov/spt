const gulp        = require('gulp');
const plumber     = require('gulp-plumber');
const changed     = require('gulp-changed');
const babel       = require("gulp-babel");
const rename      = require('gulp-rename');
const concat      = require('gulp-concat');
const eslint      = require('gulp-eslint');
const uglify      = require('gulp-uglify');
const runSequence = require('run-sequence');

const config      = require('../config');


// Сборка и минификация JS
gulp.task('scripts', function() {
  return runSequence('scripts:app', 'scripts:vendor');
});

// Сборка и минификация (по желанию) скриптов проекта
gulp.task('scripts:app', function() {
  return gulp.src(config.source.scripts.app)
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(changed(config.build.scripts))
    .pipe(eslint.format())
    .pipe(babel())
    // .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.build.scripts))
});

// Сборка и минификация используемых библиотек
gulp.task('scripts:vendor', function() {
  return gulp.src(config.source.scripts.vendor)
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(changed(config.build.scripts))
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.build.scripts))
});
