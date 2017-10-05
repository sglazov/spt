const gulp = require('gulp');
const cachebust = require('gulp-cache-bust');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const paths = require('../paths');


// Очистка кэша для CSS- и JS-файлов
gulp.task('cleancache', function() {
  gulp.src(paths.build.html + '/**/*.html')
    .pipe(cachebust())
    .pipe(gulp.dest(paths.build.html))
    .pipe(reload({stream: true}));
});
