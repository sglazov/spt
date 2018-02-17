const log = require('fancy-log');
const beeper = require('beeper');
const chalk = require('chalk');


module.exports = function(error) {
	log([
		chalk.black.bgRed.bold(error.name + ' in ' + error.plugin)
		+ ': ' +
		chalk.red(error.message)
  ].join('\n'));
  beeper();
	this.emit('end');
};
