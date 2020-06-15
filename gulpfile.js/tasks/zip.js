const { src, dest } = require('gulp');
const zipper = require('gulp-zip');

const package = require('../../package.json');
const config = require('../config');
const now = require('../utils/date-time');

const project_name = package.name || 'public_html';
const zip_name = project_name + now + '.zip';

function zip() {
  return src(config.build.root + '**/*')
    .pipe(zipper(zip_name))
    .pipe(dest(config.root))
}

module.exports = zip;
