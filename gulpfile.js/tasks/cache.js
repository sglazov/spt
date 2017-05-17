const gulp = require('gulp');
const cachebust = require('gulp-cache-bust');

const paths = require('../paths');


// Очистка кэша для CSS- и JS-файлов
gulp.task('cache', function() {
  gulp.src(paths.build.html + '*.html')
    .pipe(cachebust())
    .pipe(gulp.dest(paths.build.html))
});
