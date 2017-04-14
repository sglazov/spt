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
  var gpath               = require('path');
  var precss              = require('precss');
  var portfinder          = require('portfinder');
  var assets              = require('postcss-assets');
  var center              = require('postcss-center');
  var clearfix            = require('postcss-clearfix');
  var cssnext             = require("postcss-cssnext");
  var easyImport          = require('postcss-easy-import');
  var shorter             = require('postcss-short');
  var sprites             = require('postcss-sprites');
  var inlinesvg           = require('postcss-inline-svg');
  var runSequence         = require('run-sequence');
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
          resources:   dist
        },
        source: {
          templates:   [src + 'templates/pages/'],
          scripts:     [src + 'scripts/'],
          styles:      [src + 'styles/'],
          images:      [src + 'images/**/*'],
          resources:   [src + 'resources/**/*']
        },
        watch: {
          templates:   [src + 'templates/**/*.html'],
          scripts:     [src + 'scripts/**/*.js'],
          vendor:      [src + 'scripts/vendor/**/*.js'],
          styles:      [src + 'styles/**/*.pcss', src + 'templates/**/*.pcss'],
          images:      [src + 'images/**/*.*'],
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

    inlinesvg: {
      options: {
        path: 'dist/assets/images/svg/'
      }
    },

    easyImport: {
      options: {
        extensions: ['.pcss'],
        glob: true
      }
    },

    plumber: {
      errorHandler: onError
    }

  }

  // Вывод ошибок
  var onError = function (err) {
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
    easyImport(plugins.easyImport.options),
    precss(),
    cssnext(),
    sprites(plugins.sprites.options),
    assets(plugins.assets.options),
    inlinesvg(plugins.inlinesvg.options),
    shorter(),
    center(),
    clearfix(),
    mqpacker(),
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
    return gulp.src(paths.source.styles + 'layout.pcss')
      .pipe(plumber(plugins.plumber))
      .pipe(changed(paths.build.styles))
      .pipe(postcss(processors))
      .pipe(rename('style.css'))
      .pipe(gulp.dest(paths.build.styles))
      .pipe(_if(argv.prod, cssnano({convertValues: {length: false}})))
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
      return runSequence('scripts:copy', browserSync.reload);
    });
    watch(paths.watch.images, function() {
      return runSequence('images', browserSync.reload);
    });
    watch(paths.watch.resources, function() {
      return runSequence('resources', browserSync.reload);
    });
  });


/*---------- Режимы ----------*/

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
