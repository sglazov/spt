/*
   Пути к файлам, с котороыми работаем:
   сборка, исходники и файлы для watch
*/

const env = require('minimist')(process.argv.slice(2));

const src  = 'app/';
const dist = 'dist/';

let config = {

  // Пути к исходникам проекта
  source: {
    templates:       [src + 'templates/pages/'],
    scripts:         {
      app:           [src + 'scripts/app/**/*.js', src + 'templates/**/*.js'],
      vendor:        [src + 'scripts/vendor/**/*.js']
    },
    styles:          [src + 'styles/'],
    images:          [src + 'images/**/*.+(jpg|jpeg|png|svg|gif|ico)'],
    imagesblocks:    [src + 'templates/**/*.+(jpg|jpeg|png|svg|gif|ico)'],
    resources:       [src + 'resources/**/*']
  },

  // Пути к исходникам проекта для бдительных вотчеров
  watch: {
    templates:       [src + 'templates/**/*.html'],
    scripts:         [src + 'scripts/app/**/*.js', src + 'scripts/vendor/**/*.js', src + 'templates/**/*.js'],
    styles:          [src + 'styles/**/*.scss', src + 'templates/**/*.scss'],
    images:          [src + 'images/**/*.+(jpg|jpeg|png|svg|gif|ico)'],
    imagesblocks:    [src + 'templates/**/*.+(jpg|jpeg|png|svg|gif|ico)'],
    resources:       [src + 'resources/**/*.*']
  },

  // Куда всё собирать-то?
  build: {
    html:            dist,
    scripts:         dist + 'assets/scripts',
    styles:          dist + 'assets/styles',
    images:          dist + 'assets/images',
    resources:       dist
  },

  errorHandler: require('./utils/errors'),

  env: {
    build:      !!env.build,
    production: !!env.production
  }
};

module.exports = config;
