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
  removeAttributeQuotes: true,
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  removeComments: true,
  sortClassName: true,
  sortAttributes: true,
  html5: true,
  decodeEntities: true,
  ignoreCustomFragments: [ /{%[\s\S]*?%}/, /<\?[=|php]?[\s\S]*?\?>/ ],
  minifyJS: false
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
