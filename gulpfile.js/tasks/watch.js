/**
 * Федеральная служба по контролю за оборотом файлов
 */

const { watch, series } = require('gulp');
const { reload } = require('./server');

const scss = require('./scss');
const template = require('./template');
const { copy_resources, copy_php, copy_fonts } = require('./copy');
const images = require('./images');
const svg_symbols = require('./svg-symbols');

const config = require('../config');


function watcher() {
  watch(config.watch.templates, series(template, reload));
  watch(config.watch.styles, series(scss, reload));
  watch(config.watch.scripts, reload);

  watch(config.src.resources, series(copy_resources, reload));
  watch(config.src.php, series(copy_php, reload));
  watch(config.src.fonts, series(copy_fonts, reload));

  watch(config.src.images, series(images, reload));
  watch(config.src.svg_symbols, series(svg_symbols, reload));
}

module.exports = watcher;
