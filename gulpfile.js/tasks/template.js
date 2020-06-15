/**
 * Работа с шаблонами
 */

const { src, dest } = require('gulp');
const _if = require('gulp-if');
const front_matter = require('gulp-front-matter');
const nunjucks_render = require('gulp-nunjucks-render');
const plumber = require('gulp-plumber');
const htmlmin = require('gulp-htmlmin');
const typograf = require('gulp-typograf');


const config = require('../config');

const htmlmin_options = {
  collapseWhitespace: true,
  ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ],
  minifyJS: false,
  removeComments: true
};

const typograf_options = {
  locale: ['ru'],
  htmlEntity: { type: 'name' },
  safeTags: [
    ['<\\?php', '\\?>'],
    ['<\\?', '\\?>'],
    ['<head>', '</head>'],
    ['<script>', '</script>']
  ]
};

function template() {
  return src(config.src.pages)
    .pipe(plumber({ errorHandler: config.error_handler }))
    .pipe(front_matter({ property: 'data' }))
    .pipe(nunjucks_render({ path: config.templates.path }))
    .pipe(_if(
      config.env.production,
      htmlmin(htmlmin_options)
    ))
    .pipe(_if(
      config.env.production,
      typograf(typograf_options)
    ))
    .pipe(dest(config.build.root))
}

module.exports = template;
