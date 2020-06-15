const { src, dest, lastRun } = require('gulp');
const _if = require('gulp-if');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');

const config = require('../config');


function images() {
  return src(config.src.images, { since: lastRun(images) })
    .pipe(plumber({ errorHandler: config.error_handler }))
    .pipe(imagemin([],
      {verbose: true}
    ))
    .pipe(dest(config.build.images))
}

module.exports = images;
