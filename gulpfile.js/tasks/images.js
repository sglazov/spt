const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const flatten = require('gulp-flatten');
const debug = require('gulp-debug');

const paths = require('../paths');
const errorHandler = require('../errorHandler');


// Копируем и оптимизируем общие изображения
gulp.task('images', function() {
  return gulp.src(paths.source.images)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(changed(paths.build.images))
		.pipe(debug({title: 'images:'}))
    .pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
    .pipe(gulp.dest(paths.build.images));
});

// Копируем и оптимизируем изображения для блоков
gulp.task('images:blocks', function() {
	return gulp.src(paths.source.imagesblocks)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(flatten())
		.pipe(changed(paths.build.images))
		.pipe(debug({title: 'images blocks:'}))
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(paths.build.images));
});
