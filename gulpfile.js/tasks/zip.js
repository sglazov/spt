const gulp = require('gulp');
const zip = require('gulp-zip');
const chalk = require('chalk');
const log = console.log;

const paths = require('../paths');

const package = require('../../package.json');


// Дата для формирования архива
const correctNumber = function correctNumber(number) {
  return number < 10 ? '0' + number : number;
};
// Сегодня сейчас
const getDateTime = function getDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = correctNumber(now.getMonth() + 1);
  const day = correctNumber(now.getDate());
  const hours = correctNumber(now.getHours());
  const minutes = correctNumber(now.getMinutes());
  return year + '-' + month + '-' + day + '-' + hours + '_' + minutes;
};

// Соберём архив с именем проекта и датой в названии
gulp.task('build-zip', function() {
  let prjName = 'dist';
  let rootFolderName = package.name;
  if (!rootFolderName || typeof rootFolderName === 'string') {
    prjName = rootFolderName;
  }
  const datetime = '-' + getDateTime();
  const zipName = prjName + datetime + '.zip';

  log(chalk.green('Архив ' + chalk.green.bold(zipName) + ' собран. Лежит в корне проекта'));

  return gulp.src('dist/**/*')
    .pipe(zip(zipName))
    .pipe(gulp.dest(''));
});
