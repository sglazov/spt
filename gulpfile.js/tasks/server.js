const browserSync = require('browser-sync');
const server = browserSync.create();


const config = require('../config');


function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: config.build.root
    },
    notify: false,
    port: 8000
  });
  done();
}

exports.reload = reload;
exports.serve = serve;
