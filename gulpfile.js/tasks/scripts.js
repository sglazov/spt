const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const babel = require("gulp-babel");
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');


const paths = require('../paths');
const errorHandler = require('../errorHandler');


// Сборка и минификация скриптов
gulp.task('scripts', function() {
    return gulp.src(paths.source.scripts)
		.pipe(plumber({errorHandler: errorHandler}))
        .pipe(changed(paths.build.scripts))
        .pipe(eslint.format())
        .pipe(babel())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.build.scripts))
});
