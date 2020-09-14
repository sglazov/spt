const { src, dest, lastRun, parallel } = require('gulp');

const config = require('../config');

function copy_resources() {
return src(config.src.resources, { since: lastRun(copy_resources), dot: true })
    .pipe(dest(config.build.root))
}

function copy_php() {
  return src(config.src.php, { since: lastRun(copy_php) })
    .pipe(dest(config.build.php))
}

function copy_fonts() {
  return src(config.src.fonts, { since: lastRun(copy_fonts) })
    .pipe(dest(config.build.fonts))
}

exports.copy_resources = copy_resources;
exports.copy_php = copy_php;
exports.copy_fonts = copy_fonts;

exports.copy = parallel(copy_resources, copy_php, copy_fonts);
