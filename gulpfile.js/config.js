/**
 *
 * Пути к файлам, с котороыми работаем:
 *
*/
const env = require('minimist')(process.argv.slice(2));

const src     = './app/src/';
const dist    = './app/public_html/';
const assets  = dist + 'assets/';

const reports = dist + './__reports/';

const images = '*.+(jpg|jpeg|png|gif|ico|webp|svg)';
const fonts = '*.{woff,woff2,ttf,eot,svg}';

const config = {
  // Сорсмапы
  maps: './maps',

  root: './app',

  // Шаблоны
  templates: {
    path : src
  },

  reports: {
    scss : reports + 'stylelint'
  },

  // Где исходники
  src: {
    pages       : [src + 'pages/**/*.html'],
    templates   : [src + '**/*.html'],
    styles      : [src + 'styles/*.scss'],
    scripts     : [src + 'scripts/app.js'],
    resources   : [src + 'resources/**/*.*'],
    images      : [src + 'images/**/' + images, src + 'components/**/' + images, '!' + src + 'images/svg-symbols/**/*.svg'],
    svg_symbols : [src + 'images/svg-symbols/**/*.svg', '!' + src + 'images/svg-symbols/templates/*'],
    php         : [src + 'php/**/*.*'],
    fonts       : [src + 'fonts/**/' + fonts]
  },


  // Куда всё собирать-то?
  build: {
    root    : dist,
    assets  : assets,
    styles  : assets + 'styles',
    scripts : assets + 'scripts',
    images  : assets + 'images',
    svg     : src + 'templates/svg',
    fonts   : assets + 'fonts',
    php     : dist + 'php'
  },

  // Наблюдаем за изменением файлов
  watch: {
    templates : [src + 'pages/**/*.html', src + 'components/**/*.html', src + 'layouts/**/*.html'],
    styles    : [src + 'styles/**/*.scss', src + 'components/**/*.scss'],
    scripts   : [src + 'scripts/**/*.js', src + 'components/**/*.js'],
  },


  // Окружения
  env: {
    development : !!env.development,
    production  : !!env.production
  },

  error_handler: require('./utils/error'),
};


module.exports = config;
