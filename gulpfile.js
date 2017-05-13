'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

require('require-dir')('./gulp', {recurse: true});


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
            ['images', 'resources', 'scripts:copy'],
            cb
        );
    });
