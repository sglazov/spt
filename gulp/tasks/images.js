const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');

const config = require('../config');
const paths = require('../paths');


// Копируем и минимизируем изображения
gulp.task('images', function() {
    return gulp.src(paths.source.images)
        .pipe(plumber(config.plugins.plumber))
        .pipe(changed(paths.build.images))
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [imageminPngquant()]
        }))
        .pipe(gulp.dest(paths.build.images));
});
