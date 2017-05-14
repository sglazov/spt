const gutil = require('gulp-util');


// Вывод ошибок
const onError = function (err) {
    gutil.log([(err.name + ' in ' + err.plugin).bold.red, '', err.message, ''].join('\n'));
    if (gutil.env.beep) {
        gutil.beep();
    }
    this.emit('end');
};

// Настройки плагинов
module.exports = {
    plugins: {
        plumber: {
            errorHandler: onError
        }
    }
};
