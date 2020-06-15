/**
 * SPT — Template for a quick start
 *
 * Sergey Glazov, sglazov@sglazov.ru
 * https://github.com/sglazov/spt
*/

const { parallel, series } = require('gulp');

const { copy } = require('./tasks/copy');
const images = require('./tasks/images');
const svg_symbols = require('./tasks/svg-symbols');
const scripts = require('./tasks/scripts');
const scss = require('./tasks/scss');
const template = require('./tasks/template');
const watcher = require('./tasks/watch');
const { serve } = require('./tasks/server');
const clean = require('./tasks/clean');
const zip = require('./tasks/zip');


// дефолтная дев-сборка
exports.default = series(
  svg_symbols,
  parallel(
    copy,
    images
  ),
  parallel(
    template,
    scss,
  ),
  parallel(
    serve,
    scripts,
    watcher
  )
);

// одноразовая сборка без вотчера и сервера
exports.build = series(
  svg_symbols,
  parallel(
    copy, images
  ),
  scripts,
  scss,
  template
);

//
exports.zip = series(
  clean,
  svg_symbols,
  copy,
  images,
  scripts,
  scss,
  template,
  zip,
  clean
);
