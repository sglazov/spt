/*
   Пути к файлам, с котороыми работаем:
   сборка, исходники и файлы для watch
*/
const src  = 'app/';
const dist = 'dist/';
// const production = util.env.production || util.env.prod || false;


let config = {

//  env:       'development',
//  production: production,

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

// setEnv: function(env) {
//  if (typeof env !== 'string') return;
//  this.env = env;
//  this.production = env === 'production';
//  process.env.NODE_ENV = env;
//},

//logEnv: function() {
//  util.log(
//    'Environment:',
//    util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
//  );
//},

  errorHandler: require('./utils/errors')
};

// config.setEnv(production ? 'production' : 'development');

module.exports = config;
