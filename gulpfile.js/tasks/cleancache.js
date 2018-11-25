const gulp        = require('gulp');
const plumber     = require('gulp-plumber');
const cachebust   = require('gulp-cache-bust');
const browserSync = require("browser-sync");
const reload      = browserSync.reload;

const config      = require('../config');


// Очистка кэша для CSS- и JS-файлов
gulp.task('cleancache', function() {
  gulp.src(config.build.html + '/**/*.html')
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(cachebust())
    .pipe(gulp.dest(config.build.html))
    .pipe(reload({stream: true}));
});
