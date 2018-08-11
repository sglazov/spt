const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const plumber  = require('gulp-plumber');
const changed  = require('gulp-changed');
const flatten  = require('gulp-flatten');
const debug    = require('gulp-debug');

const config   = require('../config');


// Копируем и оптимизируем общие изображения
gulp.task('images', function() {
  return gulp.src(config.source.images)
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(changed(config.build.images))
    .pipe(debug({title: 'images:'}))
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.build.images));
});

// Копируем и оптимизируем изображения для блоков
gulp.task('images:blocks', function() {
  return gulp.src(config.source.imagesblocks)
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(flatten())
    .pipe(changed(config.build.images))
    .pipe(debug({title: 'images blocks:'}))
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.build.images));
});
