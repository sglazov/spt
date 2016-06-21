'use strict';

var autoprefixer        = require('autoprefixer'),
    browserSync         = require("browser-sync"),
    mqpacker            = require('css-mqpacker'),
    del                 = require('del'),
    doiuse              = require('doiuse'),
    gulp                = require('gulp'),
    concat              = require('gulp-concat'),
    cssnano             = require('gulp-cssnano'),
    eslint              = require('gulp-eslint'),
    include             = require("gulp-html-tag-include"),
    imagemin            = require('gulp-imagemin'),
    imageminPngquant    = require('imagemin-pngquant'),
    newer               = require('gulp-newer'),
    plumber             = require('gulp-plumber'),
    postcss             = require('gulp-postcss'),
    rename              = require('gulp-rename'),
    uglify              = require('gulp-uglify'),
    gutil               = require('gulp-util'),
    watch               = require('gulp-watch'),
    zip                 = require('gulp-zip'),
    gpath               = require('path'),
    portfinder          = require('portfinder'),
    assets              = require('postcss-assets'),
    center              = require('postcss-center'),
    clearfix            = require('postcss-clearfix'),
    colorRgbaFallback   = require("postcss-color-rgba-fallback"),
    cssnext             = require("postcss-cssnext"),
    fontmagician        = require('postcss-font-magician'),
    grid                = require('postcss-grid-system'),
    imprt               = require('postcss-import'),
    nested              = require("postcss-nested"),
    normalize           = require('postcss-normalize'),
    property            = require('postcss-property-lookup'),
    responsivetype      = require('postcss-responsive-type'),
    vars                = require('postcss-simple-vars'),
    size                = require('postcss-size'),
    postcsssvg          = require('postcss-svg'),
    runSequence         = require('run-sequence'),
    sugarss             = require("sugarss"),
    reload              = browserSync.reload;

// Пути к файлам
var src = './app/',
    dist = './dist/',
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

// Настройки плагинов
var plugins = {
  browserSync: {
    locall: {
      server: {
        baseDir: "./dist"
      },
      host: 'localhost',
      notify: false,
      port: 8000
    },
    world: {
      server: {
        baseDir: "./dist"
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
          'last 2 version',
          'Chrome >= 20',
          'Firefox >= 20',
          'Opera >= 12',
          'Android 2.3',
          'Android >= 4',
          'iOS >= 6',
          'Safari >= 6',
          'Explorer >= 8'
        ],
      cascade: false
    }
  },

  doiuse: {
    options: {
      browsers: [
        'last 2 version',
        'Chrome >= 20',
        'Firefox >= 20',
        'Opera >= 12',
        'Android 2.3',
        'Android >= 4',
        'iOS >= 6',
        'Safari >= 6',
        'Explorer >= 8'
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
  }
}

// Список задач для сборки стилей
var processors = [
  imprt,
  cssnext({
      autoprefixer: (plugins.autoprefixer.options)
    }),
  vars,
  nested,
  size,
  clearfix,
  normalize,
  property,
  center,
  mqpacker,
  postcsssvg({
    paths: ['app/images'],
    ei: { "defaults": "[fill]: black" }
  }),
  colorRgbaFallback,
  assets({
    loadPaths: ['app/images/']
  }),
  grid,
  doiuse,
  responsivetype,
  fontmagician
];

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

// Запуск живой сборки
gulp.task('live', function() {
  gulp.start('server', 'include', 'styles', 'scripts', 'watch', 'copy');
});

// Туннель
gulp.task('external-world', function() {
  gulp.start('web-server', 'include', 'styles', 'scripts', 'watch', 'copy');
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

// Федеральная служба по контролю за оборотом файлов
gulp.task('watch', function() {
  watch(paths.watch.templates, function() {
    return runSequence('include', 'html');
  });
  watch(paths.watch.styles, function() {
    return runSequence('styles');
  });
  watch(paths.watch.scripts, function() {
    return runSequence('scripts');
  });
  watch(paths.watch.images, function() {
    return runSequence('images');
  });
  watch(paths.watch.resources, function() {
    return runSequence('resources');
  });
  watch(paths.watch.fonts, function() {
    return runSequence('fonts');
  });
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
    browserSync(plugins.browserSync.locall);
  });
});

// Запуск локального сервера c туннелем
gulp.task('web-server', function() {
  portfinder.getPort(function (err, port){
    browserSync(plugins.browserSync.world);
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
    .pipe(imagemin(plugins.imagemin.options))
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
