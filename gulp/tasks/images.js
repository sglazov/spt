const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const flatten = require('gulp-flatten');

const config = require('../config');
const paths = require('../paths');


// Копируем и минимизируем общие изображения
gulp.task('images', function() {
    return gulp.src(paths.source.images)
        .pipe(plumber(config.plugins.plumber))
        .pipe(changed(paths.source.images))
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [imageminPngquant()]
        }))
        .pipe(gulp.dest(paths.build.images));
});


// Копируем и минимизируем изображения
gulp.task('images:blocks', function() {
	return gulp.src(paths.source.imagesblocks)
		.pipe(plumber(config.plugins.plumber))
		.pipe(changed(paths.source.imagesblocks))
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [imageminPngquant()]
		}))
		.pipe(flatten())
		.pipe(gulp.dest(paths.build.images));
});
