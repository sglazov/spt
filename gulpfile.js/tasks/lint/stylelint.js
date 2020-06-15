const { src, dest } = require('gulp');

const stylelint = require('gulp-stylelint');

const stylelint_options = {
  // fix: true,
  failAfterError: false,
  reportOutputDir: config.reports.scss,
  reporters: [{
    formatter: 'verbose',
    save: 'stylelint-scss-report.txt'
  }]
};

function lint_scss() {
  return src(config.watch.styles)
    .pipe(stylelint(stylelint_options))
  // .pipe(dest(config.src.scss_fix, { overwrite: true }))
}
