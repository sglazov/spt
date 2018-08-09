const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const nunjucksRender = require('gulp-nunjucks-render');
const frontMatter    = require('gulp-front-matter');
// const htmlmin = require('gulp-htmlmin');

const config = require('../config');
const errorHandler = require('../errorHandler');


// Шаблонизация
gulp.task('html', function() {
  return gulp.src(config.source.templates + '*.html')
    .pipe(plumber({errorHandler: errorHandler}))
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
