const del = require('del');
const config = require('../config');

function clean() {
  return del(config.build.root)
}

module.exports = clean;
