/**
 * Сборка стилей: SCSS, PostCSS
 */

const { src, dest } = require('gulp');
const _if = require('gulp-if');
const sass = require('gulp-sass');
const sass_importer = require('node-sass-glob-importer');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");
const clean_css = require('gulp-clean-css');


const config = require('../config');

const sass_options = {
  importer: sass_importer(),
  outputStyle: config.env.production ? 'compressed' : 'expanded',
  errLogToConsole: true,
  precision: 4
};

// postcss plugins
const processors = [
  require('postcss-media-minmax'),
  require('autoprefixer'),
  require('postcss-flexbugs-fixes'),
  require('postcss-100vh-fix')
];


function scss() {
  return src(config.src.styles, { sourcemaps: config.env.development ? true : ''} )
    .pipe(sass(sass_options).on('error', config.error_handler))
    .pipe(postcss(processors))
    .pipe(_if(
      config.env.production,
      clean_css()
    ))
    .pipe(rename('styles.min.css'))
    .pipe(dest(config.build.styles, { sourcemaps: config.env.development ? config.maps : '' }))
}

module.exports = scss;
