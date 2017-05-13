/*
   Пути к файлам, с котороыми работаем:
   сборка, исходники и файлы для watch
*/

const src  = 'app/';
const dist = 'dist/';

module.exports = {
    build: {
        html:          dist,
        scripts:       dist + 'assets/scripts',
        styles:        dist + 'assets/styles',
        images:        dist + 'assets/images/',
        resources:     dist
    },
    source: {
        templates:     [src + 'templates/pages/'],
        scripts:       [src + 'scripts/**/*.js', src + 'templates/**/*.js', src + '!scripts/vendor/**/*.js'],
        styles:        [src + 'styles/'],
        images:        [src + 'images/**/*'],
		imagesblocks:  [src + 'templates/**/*.+(jpg|jpeg|png|svg|gif|ico)'],
        resources:     [src + 'resources/**/*']
    },
    watch: {
        templates:     [src + 'templates/**/*.html'],
        scripts:       [src + 'scripts/**/*.js', src + 'templates/**/*.js'],
	 	vendor:        [src + 'scripts/vendor/**/*.js'],
        styles:        [src + 'styles/**/*.pcss', src + 'templates/**/*.pcss'],
        images:        [src + 'images/**/*.*'],
		imagesblocks:  [src + 'templates/**/*.+(jpg|jpeg|png|svg|gif|ico)'],
        resources:     [src + 'resources/**/*.*']
   }
};

