/*
  SPT — Template for a quick start
  Version 1.0.0

  Sergey Glazov
  https://github.com/4enki/spt
*/
const gulp        = require('gulp');
const runSequence = require('run-sequence');
const chalk       = require('chalk');
const log         = console.log;

const config      = require('./config')

require('require-dir')('./tasks', {recurse: true});


/*---------- Режимы запуска ----------*/

  // Запуск живой сборки
  gulp.task('default', function(cb) {
    return runSequence(
      'copy',
     ['html', 'scripts', 'styles'],
      'watch',
      'cleancache',
      'server',
      cb
    );
  });

  // Одноразовая сборка проекта в браузер
  gulp.task('one', function(cb) {
    return runSequence(
      'copy',
     ['html', 'scripts', 'styles:build'],
      'server',
      cb
    );
  });

  // Одноразовая сборка проекта без вотчеров и браузера
  gulp.task('build', function(cb) {
    return (
      log(
        chalk.green (
          'Собираем сборку в окружении: ' + chalk.bold( config.env.production ? 'production' : 'development' )
        )
      ),
      runSequence(
        'copy',
       ['html', 'scripts', 'styles:build'],
        cb
      )
    );
  });

  // Одноразовая сборка проекта в *.zip-архив в корне проекта
  gulp.task('zip', function(cb) {
    return runSequence(
      'cleanup',
      'copy',
     ['html', 'scripts', 'styles:build'],
      'build-zip',
      'cleanup',
      cb
    );
  });
