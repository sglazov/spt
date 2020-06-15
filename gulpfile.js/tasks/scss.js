/**
 * Сборка стилей: SCSS, PostCSS
 */

const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const sass_importer = require('node-sass-glob-importer');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");


const config = require('../config');

// postcss plugins
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');
const minmax = require('postcss-media-minmax');

const sass_options = {
  importer: sass_importer(),
  outputStyle: config.env.production ? 'compressed' : 'expanded',
  errLogToConsole: true,
  precision: 4
};

const processors = [
  minmax(),
  autoprefixer(),
  flexbugs()
];


function scss() {
  return src(config.src.styles, { sourcemaps: config.env.development ? true : ''} )
    .pipe(sass(sass_options).on('error', config.error_handler))
    .pipe(postcss(processors))
    .pipe(rename('styles.min.css'))
    .pipe(dest(config.build.styles, { sourcemaps: config.env.development ? config.maps : '' }))
}

module.exports = scss;
