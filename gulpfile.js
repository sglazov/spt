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
    newer = require('gulp-newer'),
    reload = browserSync.reload,
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    include = require("gulp-html-tag-include"),
    sugarss = require("sugarss"),
    clearfix = require('postcss-clearfix'),
    size = require('postcss-size'),
    normalize = require('postcss-normalize'),
    gpath = require('path'),
    property = require('postcss-property-lookup'),
    runSequence = require('run-sequence'),
    center = require('postcss-center'),
    mqpacker = require('css-mqpacker'),
    postcsssvg = require('postcss-svg'),
    colorRgbaFallback = require("postcss-color-rgba-fallback"),
    assets = require('postcss-assets'),
    nested = require("postcss-nested"),
    cssnext = require("postcss-cssnext"),
    vars = require('postcss-simple-vars'),
    imprt = require('postcss-import'),
    imagemin = require('gulp-imagemin'),
    doiuse = require('doiuse'),
    grid = require('postcss-grid-system'),
    zip = require('gulp-zip'),
    del = require('del');

var src = './app/',
    dist = './dist/',
    paths = {
      build: {
        html:       dist,
        scripts:    dist + 'scripts',
        styles:     dist + 'styles',
        images:     dist + 'images',
        fonts:      dist + 'fonts',
        resources:  dist
      },
      source: {
        templates:  [src + 'templates/'],
        scripts:    [src + 'scripts/'],
        styles:     [src + 'styles/'],
        images:     [src + 'images/**/*'],
        fonts:      [src + 'fonts/**/*'],
        resources:  [src + 'resources/**/*']
      }
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
	return year + '-' + month + '-' + day + '-' + hours + '_' + minutes;
};

// Одноразовая сборка проекта
gulp.task('default', function() {
  gulp.start('include', 'styles', 'scripts', 'copy');
});

// Одноразовая сборка проекта в *.zip-архив в корне проекта
gulp.task('zip', function(cb) {
  return runSequence(
    'cleanup',
    ['include', 'styles', 'scripts', 'copy', 'build-zip'],
    'build-zip',
    'cleanup',
    cb
  );
  return gutil.log(gutil.colors.green('Архив готов, лежит в корне проекта;'));
});

// Копируем статичные файлы
gulp.task('copy', function(cb) {
  return runSequence(
    [
      'fonts',
      'images',
      'resources'
    ],
    cb
  );
});

// Запуск живой сборки
gulp.task('live', function() {
  gulp.start('server', 'include', 'styles', 'scripts', 'watch', 'copy');
});

// Туннель
gulp.task('external-world', function() {
  gulp.start('web-server', 'include', 'styles', 'scripts', 'watch', 'copy');
});

// Федеральная служба по контролю за оборотом файлов
gulp.task('watch', function() {
  gulp.watch(paths.source.styles + '**/*.sss', ['styles']);
  gulp.watch(paths.source.scripts + '*.js', ['scripts']);
  gulp.watch(paths.source.templates + '**/*.html', ['include', 'html']);
  gulp.watch(paths.source.templates + 'blocks/*.html', ['include', 'html']);
  gulp.watch(paths.source.images + '**/*.*', ['images']);
  gulp.watch(paths.source.fonts + '**/*.*', ['fonts']);
  gulp.watch(paths.source.resources + '**/*.*', ['resources']);
});

// Шаблонизация
gulp.task('include', function() {
  return gulp.src(paths.source.templates + '*.html')
  .pipe(plumber({errorHandler: errorHandler}))
  .pipe(include())
  .pipe(gulp.dest(paths.build.html));
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
  return gulp.src(paths.source.styles + 'layout.sss')
  .pipe(plumber({errorHandler: errorHandler}))
  .pipe(postcss(processors, { parser: sugarss }))
  .pipe(rename('style.css'))
  //.pipe(cssnano({discardComments: {removeAll: true}, convertValues: {length: false}}))
  .pipe(gulp.dest(paths.build.styles))
  .pipe(reload({stream: true}));
});

// Сборка и минификация скриптов
gulp.task('scripts', function() {
  return gulp.src(paths.source.scripts + '*.js')
  .pipe(plumber({errorHandler: errorHandler}))
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.build.scripts))
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
  gulp.src(paths.build.html + '*.html')
  .pipe(reload({stream: true}));
});

// Копируем шрифты
gulp.task('fonts', function () {
  gulp.src(paths.source.fonts)
    .pipe(plumber({errorHandler: errorHandler}))

    .pipe(newer(paths.build.fonts))
    .pipe(gulp.dest(paths.build.fonts))

    .pipe(reload({stream: true}));
  gutil.log(gutil.colors.green('Шрифты скопированы;'));
});

// Копируем и минимизируем изображения
gulp.task('images', function() {
  gulp.src(paths.source.images)
    .pipe(plumber({errorHandler: errorHandler}))

    .pipe(newer(paths.build.images))
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest(paths.build.images))

    .pipe(reload({stream: true}));
  return gutil.log(gutil.colors.green('Картинки скопированы;'));
});

// Копируем другие файлы в корень проекта
gulp.task('resources', function() {
  gulp.src(paths.source.resources)
    .pipe(plumber({errorHandler: errorHandler}))

    .pipe(newer(paths.build.resources))

    .pipe(gulp.dest(paths.build.resources))

    .pipe(reload({stream: true}));
  return gutil.log(gutil.colors.green('Статичные файлы скопированы;'));
});

// Собирем архив с именем проекта и датой в названии
gulp.task('build-zip', function() {
  var prjName = 'dist';
  var rootFolderName = gpath.basename(__dirname);
  if (!rootFolderName || typeof rootFolderName === 'string') {
    prjName = rootFolderName;
  }
  var datetime = '-' + getDateTime();
  var zipName = prjName + datetime + '.zip';

  return gulp.src('dist/**/*')
    .pipe(zip(zipName))
    .pipe(gulp.dest('.'));
});

// Отчистка папки dist
gulp.task('cleanup', function(cb) {
  return del('./dist', cb);
});

// Функция обработки ошибок
var errorHandler = function(err) {
  gutil.log(gutil.colors.red([(err.name + ' in ' + err.plugin), '', err.message, ''].join('\n')));
  if (gutil.env.beep) {
    gutil.beep();
  }
  this.emit('end');
};

// Print object in console
var debugObj = function (obj) {
	console.log(gutil.inspect(obj, {showHidden: false, depth: null}));
};
