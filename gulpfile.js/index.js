/*
	SPT — Template for a quick start
	Version 0.7.0

	Sergey Glazov
	https://github.com/4enki/spt
*/
const gulp = require('gulp');
const runSequence = require('run-sequence');

const paths = require('./paths')

require('require-dir')('./tasks', {recurse: true});


/*---------- Режимы запуска ----------*/

    // Запуск живой сборки
    gulp.task('default', function(cb) {
        return runSequence(
            'copy',
            ['html', 'styles', 'scripts'],
            'watch',
            'server',
            cb
        );
    });

    // Одноразовая сборка проекта
    gulp.task('one', function(cb) {
        return runSequence(
            'copy',
            ['html', 'styles', 'scripts'],
            'server',
            cb
        );
    });

    // Одноразовая сборка проекта в *.zip-архив в корне проекта
    gulp.task('zip', function(cb) {
        return runSequence(
			'cleanup',
            'copy',
            ['html', 'styles', 'scripts'],
            'build-zip',
            'cleanup',
            cb
        );
    });

    // Копируем статичные файлы
    gulp.task('copy', function(cb) {
        return runSequence(
            ['images', 'images:blocks', 'resources', 'scripts:copy'],
            cb
        );
    });
