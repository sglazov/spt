'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('gulp-cssnano'),
    portfinder = require('portfinder'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    include = require("gulp-html-tag-include"),
    sugarss = require("sugarss"),
    clearfix = require('postcss-clearfix'),
    size = require('postcss-size'),
    normalize = require('postcss-normalize'),
    property = require('postcss-property-lookup'),
    center = require('postcss-center'),
    mqpacker = require('css-mqpacker'),
    postcsssvg = require('postcss-svg'),
    colorRgbaFallback = require("postcss-color-rgba-fallback"),
    assets = require('postcss-assets'),
    nested = require("postcss-nested"),
    cssnext = require("postcss-cssnext"),
    vars = require('postcss-simple-vars'),
    imprt = require('postcss-import'),
    doiuse = require('doiuse'),
    grid = require('postcss-grid-system'),
    zip = require('gulp-zip');

// Ресурсы проекта
var paths = {
  styles: 'app/styles/',
  css: 'dist/styles/',
  scripts: 'app/scripts/',
  js: 'dist/scripts/',
  templates: 'app/templates/',
  html: 'dist/'
};

// Дата для формирования архива
var correctNumber = function correctNumber(number) {
	return number < 10 ? '0' + number : number;
};
// Дата прям сейчас
var getDateTime = function getDateTime() {
	var now = new Date();
	var year = now.getFullYear();
	var month = correctNumber(now.getMonth() + 1);
	var day = correctNumber(now.getDate());
	var hours = correctNumber(now.getHours());
	var minutes = correctNumber(now.getMinutes());
	return year + '-' + month + '-' + day + '-' + hours + minutes;
};

// Одноразовая сборка проекта
gulp.task('default', function() {
  gulp.start('include', 'styles', 'scripts', 'copy-assets');
});

// Одноразовая сборка проекта в *.zip-архив в корне проекта
gulp.task('zip', function() {
		gulp.start('include', 'styles', 'scripts', 'copy-assets', 'build-zip', 'cleanup');
    return gutil.log(gutil.colors.green('Архив готов, лежит в корне проекта;'));
});

// Запуск живой сборки
gulp.task('live', function() {
  gulp.start('server', 'include', 'styles', 'scripts', 'watch', 'copy-assets');
});

// Туннель
gulp.task('external-world', function() {
  gulp.start('web-server', 'include', 'styles', 'scripts', 'watch', 'copy-assets');
});

// Федеральная служба по контролю за оборотом файлов
gulp.task('watch', function() {
  gulp.watch(paths.styles + '**/*.sss', ['styles']);
  gulp.watch(paths.scripts + '*.js', ['scripts']);
  gulp.watch(paths.templates + '**/*.html', ['include', 'html']);
  gulp.watch(paths.templates + 'blocks/*.html', ['include', 'html']);
});

// Шаблонизация
gulp.task('include', function() {
  return gulp.src(paths.templates + '*.html')
  .pipe(plumber({errorHandler: errorHandler}))
  .pipe(include())
  .pipe(gulp.dest(paths.html));
});

// Компиляция стилей
gulp.task('styles', function () {
  var processors = [
    imprt,
    cssnext({
        autoprefixer: {
          browsers: ['> 1%', 'IE 7']
        }
      }),
    vars,
    nested,
    //autoprefixer({browsers: 'last 3 version'}),
    size,
    clearfix,
    normalize,
    property,
    center,
    mqpacker,
    postcsssvg({ defaults: '[fill]: black' }),
    colorRgbaFallback,
    assets({
      loadPaths: ['app/images/']
    }),
    grid
    // doiuse({
    //   browsers: [
    //     'ie >= 8',
    //     '> 1%'
    //   ],
    //   ignore: ['rem'], // что не смотреть?
    //   ignoreFiles: ['**/normalize.css'], // куда не смотреть?
    //   onFeatureUsage: function (usageInfo) {
    //     console.log(usageInfo.message)
    //   }
    // })
  ];
  return gulp.src(paths.styles + 'layout.sss')
  .pipe(plumber({errorHandler: errorHandler}))
  .pipe(postcss(processors, { parser: sugarss }))
  .pipe(rename('style.css'))
  //.pipe(cssnano({discardComments: {removeAll: true}, convertValues: {length: false}}))
  .pipe(gulp.dest(paths.css))
  .pipe(reload({stream: true}));
});

// Сборка и минификация скриптов
gulp.task('scripts', function() {
  return gulp.src(paths.scripts + '*.js')
  .pipe(plumber({errorHandler: errorHandler}))
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.js))
  .pipe(reload({stream: true}));
});

// Запуск локального сервера
gulp.task('server', function() {
  portfinder.getPort(function (err, port){
    browserSync({
      server: {
        baseDir: "./dist"
      },
      host: 'localhost',
      notify: false,
      port: port
    });
  });
});

// Запуск локального сервера c туннелем
gulp.task('web-server', function() {
  portfinder.getPort(function (err, port){
    browserSync({
      server: {
        baseDir: "./dist"
      },
      tunnel: true,
      host: 'localhost',
      notify: false,
      port: port
    });
  });
});

// Рефреш ХТМЛ-страниц
gulp.task('html', function () {
  gulp.src(paths.html + '*.html')
  .pipe(reload({stream: true}));
});

// Копируем статичные файлы
gulp.task('copy-assets', function() {
  var distFonts = gulp.src('app/fonts/**/*') // Переносим шрифты
      .pipe(gulp.dest('dist/fonts'));
  var buildImages = gulp.src('app/images/**/*') // Переносим картинки
      .pipe(gulp.dest('dist/images'));
  var buildResources = gulp.src('app/resources/**/*') // Переносим остальные файлы
      .pipe(gulp.dest('dist/resources'));
});

// Собирем архив в датой в названии
gulp.task('build-zip', function() {
	var datetime = '-' + getDateTime();
	var zipName = 'dist' + datetime + '.zip';

	return gulp.src('dist/**/*')
		.pipe(zip(zipName))
		.pipe(gulp.dest('.'));
});

gulp.task('cleanup', function(cb) {
  return del(path.html + '/*', cb);
});


// Функция обработки ошибок
var errorHandler = function(err) {
  gutil.log(gutil.colors.Red([(err.name + ' in ' + err.plugin), '', err.message, ''].join('\n')));
  if (gutil.env.beep) {
    gutil.beep();
  }
  this.emit('end');
};

// Print object in console
var debugObj = function (obj) {
	var util = require('util');
	console.log(util.inspect(obj, {showHidden: false, depth: null}));
};
