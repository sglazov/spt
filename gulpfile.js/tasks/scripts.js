const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const babel = require("gulp-babel");
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');


const paths = require('../paths');
const errorHandler = require('../errorHandler');

// Сборка и минификация JS
gulp.task('scripts', function() {
  return runSequence('scripts:app', 'scripts:vendor');
});

// Сборка и минификация (по желанию) скриптов проекта
gulp.task('scripts:app', function() {
  return gulp.src(paths.source.scripts.app)
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(changed(paths.build.scripts))
    .pipe(eslint.format())
    .pipe(babel())
    // .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.build.scripts))
});

// Сборка и минификация используемых библиотек
gulp.task('scripts:vendor', function() {
  return gulp.src(paths.source.scripts.vendor)
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(changed(paths.build.scripts))
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.build.scripts))
});
