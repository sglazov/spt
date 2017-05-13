const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');

const precss = require('precss');

const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const center = require('postcss-center');
const clearfix = require('postcss-clearfix');
const cssnext = require("postcss-cssnext");
const easyImport = require('postcss-easy-import');
const shorter = require('postcss-short');
const sprites = require('postcss-sprites');
const inlinesvg = require('postcss-inline-svg');

const cqPostcss = require('cq-prolyfill/postcss-plugin');
const mqpacker = require('css-mqpacker');

const _if = require('gulp-if');
const argv = require('yargs').argv;

const paths = require('../paths');
const config = require('../config');


// Список PostCSS-плагинов
const processors = [
    easyImport({
        extensions: ['.pcss'],
        glob: true
    }),
    precss(),
    cssnext(),
    sprites({
        stylesheetPath: 'dist/assets/styles/',
        spritePath: 'dist/assets/images/sprites/'
    }),
    assets({
        basePath: 'dist/',
        loadPaths: ['assets/images/']
    }),
    inlinesvg({
        path: 'dist/assets/images/svg/'
    }),
    shorter(),
    center(),
    clearfix(),
    mqpacker(),
    cqPostcss()
];

// Компиляция стилей
gulp.task('styles', function () {
    return gulp.src(paths.source.styles + 'layout.pcss')
        .pipe(plumber(config.plugins.plumber))
        .pipe(changed(paths.build.styles))
        .pipe(postcss(processors))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(paths.build.styles))
        .pipe(_if(argv.prod, cssnano({convertValues: {length: false}})))
        .pipe(_if(argv.prod, rename('style.min.css')))
        .pipe(_if(argv.prod, gulp.dest(paths.build.styles)));
});
