const log = require('fancy-log');

module.exports = function(error) {
  log([
    error.messageFormatted || error.message
  ].join('\n\n'));
  this.emit('end');
};
