const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const babel = require("gulp-babel");
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

const _if = require('gulp-if');
const argv = require('yargs').argv;

const paths = require('../paths');
const config = require('../config');


// Сборка и минификация скриптов
gulp.task('scripts', function() {
    return gulp.src(paths.source.scripts + '*.js')
        .pipe(plumber(config.plugins.plumber))
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
        .pipe(plumber(config.plugins.plumber))
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.scripts));
});
