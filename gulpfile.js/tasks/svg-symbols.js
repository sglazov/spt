const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');

const svgmin = require('gulp-svgmin');
const svgSymbols = require('gulp-svg-symbols');
const cheerio = require('gulp-cheerio');


const config = require('../config');

const svg = {
  symbols   : './app/src/images/svg-symbols/templates/svg-symbols.svg',
  demo_page : './app/src/images/svg-symbols/templates/svg-symbols-demo-page.html',
  scss      : './app/src/images/svg-symbols/templates/svg-symbols.scss'
};

const svgmin_options = {
  js2svg: {
    pretty: true
  }
};
const symbols_options = {
  slug: function(name) {
    return 'i_' + name;
  },
  templates: [
    svg.symbols,
    svg.demo_page,
    svg.scss
  ],
  viewBox: false
};

function svg_symbols() {
  return src(config.src.svg_symbols)
    .pipe(plumber({ errorHandler: config.error_handler }))
    .pipe(svgmin(svgmin_options))
    .pipe(cheerio(function ($) {
      $('[fill]').each(function() {
        if ( $(this).attr('fill') !== 'currentcolor' ) {
          $(this).attr('fill', 'currentcolor');
        }
      });
    }))
    .pipe(svgSymbols(symbols_options))
    .pipe(dest(config.build.svg))
}

module.exports = svg_symbols;
