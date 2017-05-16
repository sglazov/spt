const gutil = require('gulp-util');
const chalk = require('chalk');


module.exports = function(error) {
	gutil.log(
		chalk.black.bgRed.bold(error.name + ' in ' + error.plugin)
		+ ': ' +
		chalk.red(error.message)
	);

	// Run with '--beep'
	if (gutil.env.beep) {
		gutil.beep();
	}

	// Keep gulp from hanging on this task
	this.emit('end');
};



