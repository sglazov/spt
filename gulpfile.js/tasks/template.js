const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const include = require("gulp-html-tag-include");

const paths = require('../paths');
const config = require('../config');


// Шаблонизация
gulp.task('html', function() {
    return gulp.src(paths.source.templates + '*.html')
        .pipe(plumber(config.plugins.plumber))
        .pipe(include())
        .pipe(gulp.dest(paths.build.html));
});
