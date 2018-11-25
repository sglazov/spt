const gulp        = require('gulp');
const gulpif      = require('gulp-if');
const plumber     = require('gulp-plumber');
// const changed  = require('gulp-changed');
const babel       = require("gulp-babel");
const sourcemaps  = require('gulp-sourcemaps');
const rigger      = require('gulp-rigger');
const concat      = require('gulp-concat');
const eslint      = require('gulp-eslint');
const uglify      = require('gulp-uglify');
const runSequence = require('run-sequence');

const config      = require('../config');


// Сборка и минификация JS
gulp.task('scripts', function() {
  return runSequence(['scripts:vendor', 'scripts:app']);
});

// Сборка и минификация используемых библиотек
gulp.task('scripts:vendor', function() {
  return gulp.src(config.source.scripts.vendor)
    .pipe(gulpif(config.env.development, sourcemaps.init()))
    .pipe(plumber({ errorHandler: config.errorHandler }))
    // .pipe(changed(config.build.scripts))
    .pipe(rigger())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulpif(config.env.development, sourcemaps.write('./maps')))
    .pipe(gulp.dest(config.build.scripts))
});

// Сборка и минификация (по желанию) скриптов проекта
gulp.task('scripts:app', function() {
  return gulp.src(config.source.scripts.app)
    .pipe(gulpif(config.env.development, sourcemaps.init()))
    .pipe(plumber({ errorHandler: config.errorHandler }))
    // .pipe(changed(config.build.scripts))
    .pipe(rigger())
    .pipe(eslint.format())
    .pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(gulpif(config.env.production, uglify()))
    .pipe(concat('app.js'))
    .pipe(gulpif(config.env.development, sourcemaps.write('./maps')))
    .pipe(gulp.dest(config.build.scripts))
});
