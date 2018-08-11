const gulp           = require('gulp');
const plumber        = require('gulp-plumber');
const nunjucksRender = require('gulp-nunjucks-render');
const frontMatter    = require('gulp-front-matter');
// const htmlmin     = require('gulp-htmlmin');
// const changed     = require('gulp-changed');

const config         = require('../config');


// Шаблонизация
gulp.task('html', function() {
  return gulp.src(config.source.templates + '*.html')
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender({
      path: 'app/templates'
    }))
//  .pipe(htmlmin({
//    collapseWhitespace: true,
//    minifyJS: true,
//    removeComments: true
//  }))
    .pipe(gulp.dest(config.build.html));
});
