const gulp         = require('gulp');
const gulpif      = require('gulp-if');
const plumber      = require('gulp-plumber');
// const changed   = require('gulp-changed');

const sass         = require('gulp-sass');
const sassGlob     = require('gulp-sass-glob');
const sasslint     = require('gulp-sass-lint');
const sourcemaps   = require('gulp-sourcemaps');

const autoprefixer = require('autoprefixer');
const postcss      = require('gulp-postcss');
const assets       = require('postcss-assets');
const inlinesvg    = require('postcss-inline-svg');
const flexbugs     = require('postcss-flexbugs-fixes');
const mqpacker     = require('css-mqpacker');
const runSequence  = require('run-sequence');

const config       = require('../config');


// Стили
gulp.task('styles', function() {
  return runSequence(['styles:build', 'styles:lint']);
});

// Список PostCSS-плагинов
const processors = [
  autoprefixer(),
  mqpacker(),
  assets({
    basePath: 'dist/',
    loadconfig: ['assets/images/']
  }),
  inlinesvg({
    path: 'dist/assets/images/svg/'
  }),
  mqpacker(),
  flexbugs()
];

// Компиляция стилей
gulp.task('styles:build', function () {
  return gulp.src(config.source.styles + 'style.scss')
    .pipe(gulpif(config.env.development, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: config.env.production ? 'compressed' : 'expanded',
      errLogToConsole: true,
      precision: 8
    }).on('error', config.errorHandler))
    .pipe(postcss(processors))
    .pipe(gulpif(config.env.development, sourcemaps.write('./maps')))
    .pipe(gulp.dest(config.build.styles));
});

// Линтинг стилей
gulp.task('styles:lint', function() {
  gulp.src(config.watch.styles)
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(plumber({ errorHandler: config.errorHandler }));
});
