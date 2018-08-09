const gulp = require('gulp');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const config = require('../config');


/*---------- Бдительные вотчеры ----------*/

// Федеральная служба по контролю за оборотом файлов
gulp.task('watch', function() {
  watch(config.watch.templates, function() {
    return runSequence('html', reload);
  });
  watch(config.watch.styles, function() {
    return runSequence(['styles', 'cleancache']);
  });
  watch(config.watch.scripts, function() {
    return runSequence(['scripts', 'cleancache']);
  });
  watch(config.watch.images, function() {
    return runSequence('images', reload);
  });
  watch(config.watch.imagesblocks, function() {
    return runSequence('images:blocks', reload);
  });
  watch(config.watch.resources, function() {
    return runSequence('resources', reload);
  });
});
