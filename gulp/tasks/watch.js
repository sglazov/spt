const gulp = require('gulp');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const paths = require('../paths');
const config = require('../config');


/*---------- Бдительные вотчеры ----------*/

// Федеральная служба по контролю за оборотом файлов
gulp.task('watch', function() {
    watch(paths.watch.templates, function() {
        return runSequence('html', browserSync.reload);
    });
    watch(paths.watch.styles, function() {
        return runSequence('styles', browserSync.reload);
    });
    watch(paths.watch.scripts, function() {
        return runSequence('scripts', browserSync.reload);
    });
    watch(paths.watch.vendor, function() {
        return runSequence('scripts:copy', browserSync.reload);
    });
    watch(paths.watch.images, function() {
        return runSequence('images', browserSync.reload);
    });
    watch(paths.watch.resources, function() {
        return runSequence('resources', browserSync.reload);
    });
});
