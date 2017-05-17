const gulp = require('gulp');
const del = require('del');


// Удаление папки ./dist
gulp.task('cleanup', function(cb) {
  return del('dist', cb);
});
