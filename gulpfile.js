'use strict';

/*---------- Что нужно и как ----------*/

  var argv                = require('yargs').argv,
      autoprefixer        = require('autoprefixer'),
      browserSync         = require("browser-sync"),
      mqpacker            = require('css-mqpacker'),
      cqPostcss           = require('cq-prolyfill/postcss-plugin'),
      del                 = require('del'),
      doiuse              = require('doiuse'),
      gulp                = require('gulp'),
      changed             = require('gulp-changed'),
      concat              = require('gulp-concat'),
      cssnano             = require('gulp-cssnano'),
      eslint              = require('gulp-eslint'),
      include             = require("gulp-html-tag-include"),
      _if                 = require('gulp-if'),
      imagemin            = require('gulp-imagemin'),
       imageminPngquant   = require('imagemin-pngquant'),
      plumber             = require('gulp-plumber'),
      postcss             = require('gulp-postcss'),
      rename              = require('gulp-rename'),
      rucksack            = require('gulp-rucksack'),
      stripCssComments    = require('gulp-strip-css-comments'),
      uglify              = require('gulp-uglify'),
      gutil               = require('gulp-util'),
      watch               = require('gulp-watch'),
      zip                 = require('gulp-zip'),
      gpath               = require('path'),
      portfinder          = require('portfinder'),
      assets              = require('postcss-assets'),
      center              = require('postcss-center'),
      colorRgbaFallback   = require("postcss-color-rgba-fallback"),
      cssnext             = require("postcss-cssnext"),
      grid                = require('postcss-grid-system'),
      imprt               = require('postcss-import'),
      initial             = require('postcss-initial'),
      mixins              = require('postcss-mixins'),
      nested              = require("postcss-nested"),
      normalize           = require('postcss-normalize'),
      property            = require('postcss-property-lookup'),
      vars                = require('postcss-simple-vars'),
      sprites             = require('postcss-sprites').default,
      shorter             = require('postcss-short'),
      postcsssvg          = require('postcss-svg'),
      runSequence         = require('run-sequence'),
      sugarss             = require("sugarss"),
      reload              = browserSync.reload;


/*---------- Пути к файлам, с котороыми работаем ----------*/

  // Пути к файлам
  var src = 'app/',
      dist = 'dist/',
      paths = {
        build: {
          html:           dist,
          scripts:        dist + 'assets/scripts',
          styles:         dist + 'assets/styles',
          images:         dist + 'assets/images',
          fonts:          dist + 'assets/fonts',
          resources:      dist
        },
        source: {
          templates:      [src + 'templates/'],
          scripts:        [src + 'scripts/'],
          styles:         [src + 'styles/'],
          images:         [src + 'images/**/*'],
          fonts:          [src + 'fonts/**/*'],
          resources:      [src + 'resources/**/*']
        },
        watch: {
          templates:      [src + 'templates/**/*.html'],
          scripts:        [src + 'scripts/**/*.js'],
          styles:         [src + 'styles/**/*.sss'],
          images:         [src + 'images/**/*.*'],
          fonts:          [src + 'fonts/**/*.*'],
          resources:      [src + 'resources/**/*.*']
        }
  };


/*---------- Настройки плагинов ----------*/

  // Настройки плагинов
  var plugins = {

    browserSync: {
      locall: {
        server: {
          baseDir: "dist"
        },
        host: 'localhost',
        notify: false,
        port: 8000
      },
      world: {
        server: {
          baseDir: "dist"
        },
        tunnel: true,
        host: 'localhost',
        notify: false,
        port: 8000
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'ie >= 8',
          '> 1%'
        ],
        cascade: false
      }
    },

    sprites: {
      options: {
        stylesheetPath: 'dist/assets/styles/',
        spritePath: 'dist/assets/images/sprites/'
      }
    },

    doiuse: {
      options: {
        browsers: [
          'ie >= 8',
          '> 1%'
        ],
        ignore: ['rem'], // что не смотреть?
        ignoreFiles: ['**/normalize.css'], // куда не смотреть?
        onFeatureUsage: function (usageInfo) {
          console.log(usageInfo.message)
        }
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
        paths: ['app/images/'],
        ei: { "defaults": "[fill]: black" }
      }
    }

  }

  // Список задач для сборки стилей
  var processors = [
    imprt,
    sprites(plugins.sprites.options),
    cssnext({autoprefixer: (plugins.autoprefixer.options)}),
    postcsssvg(plugins.postcsssvg.options),
    assets(plugins.assets.options),
    mixins,
    vars,
    nested,
    shorter,
    normalize,
    property,
    center,
    mqpacker,
    colorRgbaFallback,
    grid,
    //doiuse(plugins.doiuse.options),
    initial,
    cqPostcss
  ];

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


/*---------- Tasks ----------*/

  // Шаблонизация
  gulp.task('include', function() {
    return gulp.src(paths.source.templates + '*.html')
      .pipe(plumber({errorHandler: errorHandler}))
      .pipe(include())
      .pipe(gulp.dest(paths.build.html));
  });

  // Рефреш ХТМЛ-страниц
  gulp.task('html', function () {
    gulp.src(paths.build.html + '*.html')
  });

  // Компиляция стилей
  gulp.task('styles', function () {
    return gulp.src(paths.source.styles + 'layout.sss')
      .pipe(plumber({errorHandler: errorHandler}))
      .pipe(changed(paths.build.styles))
      .pipe(postcss(processors, { parser: sugarss }))
      .pipe(rucksack())
      .pipe(rename('style.css'))
      .pipe(stripCssComments())
      .pipe(gulp.dest(paths.build.styles))
      .pipe(_if(argv.prod, cssnano()))
      .pipe(_if(argv.prod, rename('style.min.css')))
      .pipe(_if(argv.prod, gulp.dest(paths.build.styles)));
  });

  // Сборка и минификация скриптов
  gulp.task('scripts', function() {
    return gulp.src(paths.source.scripts + '*.js')
      .pipe(plumber({errorHandler: errorHandler}))
      .pipe(changed(paths.build.scripts))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(paths.build.scripts))
      .pipe(_if(argv.prod, uglify()))
      .pipe(_if(argv.prod, rename('scripts.min.css')))
      .pipe(_if(argv.prod, gulp.dest(paths.build.scripts)));
  });

  // Запуск локального сервера
  gulp.task('server', function() {
    portfinder.getPort(function (err, port){
      browserSync(plugins.browserSync.locall);
    });
  });

  // Запуск локального сервера c туннелем
  gulp.task('web-server', function() {
    portfinder.getPort(function (err, port){
      browserSync(plugins.browserSync.world);
    });
  });

  // Копируем шрифты
  gulp.task('fonts', function () {
    return gulp.src(paths.source.fonts)
      .pipe(plumber({errorHandler: errorHandler}))
      .pipe(changed(paths.build.fonts))
      .pipe(gulp.dest(paths.build.fonts))
      .pipe(reload({stream: true}));
    gutil.log(gutil.colors.cyan('Шрифты скопированы...'));
  });

  // Копируем и минимизируем изображения
  gulp.task('images', function() {
    return gulp.src(paths.source.images)
      .pipe(plumber({errorHandler: errorHandler}))
      .pipe(changed(paths.build.images))
      .pipe(imagemin(plugins.imagemin.options))
      .pipe(gulp.dest(paths.build.images));
    return gutil.log(gutil.colors.cyan('Картинки скопированы...'));
  });

  // Копируем другие файлы в корень проекта
  gulp.task('resources', function() {
    return gulp.src(paths.source.resources)
      .pipe(plumber({errorHandler: errorHandler}))
      .pipe(changed(paths.build.resources))
      .pipe(gulp.dest(paths.build.resources));
    return gutil.log(gutil.colors.cyan('Статичные файлы скопированы...'));
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
      return runSequence('include', 'html', browserSync.reload);
    });
    watch(paths.watch.styles, function() {
      return runSequence('styles', browserSync.reload);
    });
    watch(paths.watch.scripts, function() {
      return runSequence('scripts', browserSync.reload);
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

  // Одноразовая сборка проекта
  gulp.task('default', function(cb) {
    return runSequence(
      'include',
      'styles',
      'scripts',
      'watch',
      'copy',
      cb
    );
  });

  // Запуск живой сборки
  gulp.task('live', function(cb) {
    return runSequence(
      ['include', 'styles', 'scripts', 'watch', 'copy'],
      'server',
      cb
    );
  });

  // Туннель
  gulp.task('external-world', function(cb) {
    return runSequence(
      ['include', 'styles', 'scripts', 'watch', 'copy'],
      'web-server',
      cb
    );
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
    return gutil.log(gutil.colors.green('Архив готов, искать нужно в корне проекта;'));
  });

  // Копируем статичные файлы
  gulp.task('copy', function(cb) {
    return runSequence(
      ['fonts',
      'images',
      'resources'],
      cb
    );
  });


/*---------- Meanwhile ----------*/

  // Функция обработки ошибок
  var errorHandler = function(err) {
    gutil.log(gutil.colors.red([(err.name + ' in ' + err.plugin), '', err.message, ''].join('\n')));
    if (gutil.env.beep) {
      gutil.beep();
    }
    this.emit('end');
  };
  // Показать ошибку в консоль
  var debugObj = function (obj) {
  	console.log(gutil.inspect(obj, {showHidden: false, depth: null}));
  };
