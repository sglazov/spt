/*
	SPT — Template for a quick start
	Version 1.0.0

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
      ['html', 'scripts', 'styles'],
      'watch',
      'cleancache',
      'server',
      cb
    );
  });

  // Одноразовая сборка проекта
  gulp.task('one', function(cb) {
    return runSequence(
      'copy',
      ['html', 'scripts', 'styles'],
      'server',
      cb
    );
  });

  // Одноразовая сборка проекта в *.zip-архив в корне проекта
  gulp.task('zip', function(cb) {
    return runSequence(
      'cleanup',
      'copy',
      ['html', 'scripts', 'styles'],
      'build-zip',
      'cleanup',
      cb
    );
  });
