/*
   Пути к файлам, с котороыми работаем:
   сборка, исходники и файлы для watch
*/

const src  = 'app/';
const dist = 'dist/';

module.exports = {
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

