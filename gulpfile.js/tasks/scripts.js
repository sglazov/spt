const { src, dest } = require('gulp');

const plumber = require('gulp-plumber');
const webpack = require('webpack');
const stream = require('webpack-stream');

const webpack_config = require('../../webpack.config.js');
const config = require('../config');

function scripts() {
  return src(config.src.scripts)
    .pipe(plumber({ errorHandler: config.error_handler }))
    .pipe(stream(webpack_config), webpack)
    .pipe(dest(config.build.scripts))
}

module.exports = scripts;
