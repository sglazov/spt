const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const debug = require('gulp-debug');

const paths = require('../paths');
const config = require('../config');


// Копируем другие файлы в корень проекта
gulp.task('resources', function() {
    return gulp.src(paths.source.resources)
        .pipe(plumber(config.plugins.plumber))
        .pipe(changed(paths.build.resources))
		.pipe(debug({title: 'resources:'}))
        .pipe(gulp.dest(paths.build.resources));
});
