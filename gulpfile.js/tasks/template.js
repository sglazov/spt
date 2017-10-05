const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const nunjucksRender = require('gulp-nunjucks-render');
const frontMatter    = require('gulp-front-matter');

const paths = require('../paths');
const errorHandler = require('../errorHandler');


// Шаблонизация
gulp.task('html', function() {
  return gulp.src(paths.source.templates + '*.html')
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender({
      path: 'app/templates'
    }))
    .pipe(gulp.dest(paths.build.html));
});
