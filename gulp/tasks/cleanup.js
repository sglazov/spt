const gulp = require('gulp');
const del = require('del');


// Отчистка папки ./dist
gulp.task('cleanup', function(cb) {
    return del('dist', cb);
});
