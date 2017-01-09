'use strict';

/*---------- Что нужно и как ----------*/

  var browserSync         = require("browser-sync");
  var cqPostcss           = require('cq-prolyfill/postcss-plugin');
  var mqpacker            = require('css-mqpacker');
  var del                 = require('del');
  var gulp                = require('gulp');
  var babel               = require("gulp-babel");
  var changed             = require('gulp-changed');
  var concat              = require('gulp-concat');
  var cssnano             = require('gulp-cssnano');
  var eslint              = require('gulp-eslint');
  var include             = require("gulp-html-tag-include");
  var _if                 = require('gulp-if');
  var imagemin            = require('gulp-imagemin');
  var plumber             = require('gulp-plumber');
  var postcss             = require('gulp-postcss');
  var rename              = require('gulp-rename');
  var uglify              = require('gulp-uglify');
  var gutil               = require('gulp-util');
  var watch               = require('gulp-watch');
  var zip                 = require('gulp-zip');
  var imageminPngquant    = require('imagemin-pngquant');
  var grid                = require('lost');
  var gpath               = require('path');
  var precss              = require('precss');
  var portfinder          = require('portfinder');
  var assets              = require('postcss-assets');
  var center              = require('postcss-center');
  var clearfix            = require('postcss-clearfix');
  var cssnext             = require("postcss-cssnext");
  var imprt               = require('postcss-easy-import');
  var ancestors           = require("postcss-nested-ancestors");
  var shorter             = require('postcss-short');
  var sprites             = require('postcss-sprites');
  var postcsssvg          = require('postcss-svg');
  var runSequence         = require('run-sequence');
  var sugarss             = require("sugarss");
  var argv                = require('yargs').argv;
  var reload              = browserSync.reload;

/*---------- Пути к файлам, с котороыми работаем ----------*/

  // Пути к файлам
  var src = 'app/',
      dist = 'dist/',
      paths = {
        build: {
          html:        dist,
          scripts:     dist + 'assets/scripts',
          styles:      dist + 'assets/styles',
          images:      dist + 'assets/images',
          fonts:       dist + 'assets/fonts',
          resources:   dist
        },
        source: {
          templates:   [src + 'templates/'],
          scripts:     [src + 'scripts/'],
          styles:      [src + 'styles/'],
          images:      [src + 'images/**/*'],
          fonts:       [src + 'fonts/**/*'],
          resources:   [src + 'resources/**/*']
        },
        watch: {
          templates:   [src + 'templates/**/*.html'],
          scripts:     [src + 'scripts/**/*.js'],
          vendor:      [src + 'scripts/vendor/**/*.js'],
          styles:      [src + 'styles/**/*.sss', src + 'templates/**/*.sss'],
          images:      [src + 'images/**/*.*'],
          fonts:       [src + 'fonts/**/*.*'],
          resources:   [src + 'resources/**/*.*']
        }
  };


/*---------- Настройки плагинов ----------*/

  // Настройки плагинов
  var plugins = {

    browserSync: {
      server: {
        baseDir: "dist"
      },
      host: 'localhost',
      notify: false,
      port: 8000
    },

    sprites: {
      options: {
        stylesheetPath: 'dist/assets/styles/',
        spritePath: 'dist/assets/images/sprites/'
      }
    },

    imagemin: {
      options: {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [imageminPngquant()]
      }
    },

    assets: {
      options: {
        basePath: 'dist/',
        loadPaths: ['assets/images/']
      }
    },

    postcsssvg: {
      options: {
        paths: ['app/images/svg/'],
        ei: { "defaults": "[fill]: black" }
      }
    },

    imprt: {
      options: {
        extensions: ['.sss']
      }
    },

    plumber: {
      errorHandler: errorHandler
    }

  }

  // Вывод ошибок
  var errorHandler = function (err) {
    $.util.log([(err.name + ' in ' + err.plugin).bold.red, '', err.message, ''].join('\n'));
    if ($.util.env.beep) {
      $.util.beep();
    }
    this.emit('end');
  };

  // Дата для формирования архива
  var correctNumber = function correctNumber(number) {
    return number < 10 ? '0' + number : number;
  };
  // Сегодня сейчас
  var getDateTime = function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = correctNumber(now.getMonth() + 1);
    var day = correctNumber(now.getDate());
    var hours = correctNumber(now.getHours());
    var minutes = correctNumber(now.getMinutes());
    return year + '-' + month + '-' + day + '-' + hours + '_' + minutes;
  };

  // Список PostCSS-плагинов
  var processors = [
    imprt(plugins.imprt.options),
    precss(),
    ancestors(),
    sprites(plugins.sprites.options),
    cssnext(),
    assets(plugins.assets.options),
    postcsssvg(plugins.postcsssvg.options),
    shorter(),
    center(),
    clearfix(),
    mqpacker(),
    grid(),
    cqPostcss()
  ];

/*---------- Tasks ----------*/

  // Шаблонизация
  gulp.task('html', function() {
    return gulp.src(paths.source.templates + '*.html')
      .pipe(plumber(plugins.plumber))
      .pipe(include())
      .pipe(gulp.dest(paths.build.html));
  });

  // Компиляция стилей
  gulp.task('styles', function () {
    return gulp.src(paths.source.styles + 'layout.sss')
      .pipe(plumber(plugins.plumber))
      .pipe(changed(paths.build.styles))
      .pipe(postcss(processors, { parser: sugarss }))
      .pipe(rename('style.css'))
      .pipe(gulp.dest(paths.build.styles))
      .pipe(_if(argv.prod, cssnano()))
      .pipe(_if(argv.prod, rename('style.min.css')))
      .pipe(_if(argv.prod, gulp.dest(paths.build.styles)));
  });

  // Сборка и минификация скриптов
  gulp.task('scripts', function() {
    return gulp.src(paths.source.scripts + '*.js')
      .pipe(plumber(plugins.plumber))
      .pipe(changed(paths.build.scripts))
      .pipe(eslint.format())
      .pipe(babel())
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(paths.build.scripts))
      .pipe(_if(argv.prod, uglify()))
      .pipe(_if(argv.prod, rename('scripts.min.js')))
      .pipe(_if(argv.prod, gulp.dest(paths.build.scripts)));
  });

  // Копируем сторонние скрипты и собираем в один файл
  gulp.task('scripts:copy', function() {
    return gulp.src(paths.source.scripts + 'vendor/*.js')
      .pipe(plumber(plugins.plumber))
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.build.scripts));
  });

  // Запуск локального сервера
  gulp.task('server', function() {
    portfinder.getPort(function (err, port){
      browserSync(plugins.browserSync);
    });
  });

  // Копируем шрифты
  gulp.task('fonts', function () {
    return gulp.src(paths.source.fonts)
      .pipe(plumber(plugins.plumber))
      .pipe(changed(paths.build.fonts))
      .pipe(gulp.dest(paths.build.fonts))
      .pipe(reload({stream: true}));
  });

  // Копируем и минимизируем изображения
  gulp.task('images', function() {
    return gulp.src(paths.source.images)
      .pipe(plumber(plugins.plumber))
      .pipe(changed(paths.build.images))
      .pipe(imagemin(plugins.imagemin.options))
      .pipe(gulp.dest(paths.build.images));
  });

  // Копируем другие файлы в корень проекта
  gulp.task('resources', function() {
    return gulp.src(paths.source.resources)
      .pipe(plumber(plugins.plumber))
      .pipe(changed(paths.build.resources))
      .pipe(gulp.dest(paths.build.resources));
  });

  // Отчистка папки dist
  gulp.task('cleanup', function(cb) {
    return del('dist', cb);
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
      .pipe(gulp.dest(''));
  });


/*---------- Бдительные вотчеры ----------*/

  // Федеральная служба по контролю за оборотом файлов
  gulp.task('watch', function() {
    watch(paths.watch.templates, function() {
      return runSequence('html', browserSync.reload);
    });
    watch(paths.watch.styles, function() {
      return runSequence('styles', browserSync.reload);
    });
    watch(paths.watch.scripts, function() {
      return runSequence('scripts', browserSync.reload);
    });
    watch(paths.watch.vendor, function() {
      runSequence('scripts:copy', browserSync.reload);
    });
    watch(paths.watch.images, function() {
      return runSequence('images', browserSync.reload);
    });
    watch(paths.watch.resources, function() {
      return runSequence('resources', browserSync.reload);
    });
    watch(paths.watch.fonts, function() {
      return runSequence('fonts', browserSync.reload);
    });
  });


/*---------- Режимы ----------*/

  // Запуск живой сборки
  gulp.task('default', function(cb) {
    return runSequence(
      'copy',
      ['html', 'styles', 'scripts', 'watch'],
      'server',
      cb
    );
  });

  // Одноразовая сборка проекта
  gulp.task('one', function(cb) {
    return runSequence(
      'copy',
      ['html', 'styles', 'scripts'],
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
      ['fonts', 'images', 'resources', 'scripts:copy'],
      cb
    );
  });
