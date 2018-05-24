const gulp = require('gulp');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const paths = require('../paths');


/*---------- Бдительные вотчеры ----------*/

// Федеральная служба по контролю за оборотом файлов
gulp.task('watch', function() {
  watch(paths.watch.templates, function() {
    return runSequence('html', reload);
  });
  watch(paths.watch.styles, function() {
    return runSequence(['styles', 'cleancache']);
  });
  watch(paths.watch.scripts, function() {
    return runSequence(['scripts', 'cleancache']);
  });
  watch(paths.watch.images, function() {
    return runSequence('images', reload);
  });
  watch(paths.watch.imagesblocks, function() {
    return runSequence('images:blocks', reload);
  });
  watch(paths.watch.resources, function() {
    return runSequence('resources', reload);
  });
});
