// Imports
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var sass = require('gulp-sass');

var header = require('gulp-header');
var pkg = require('./package.json');


// Vars
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version <%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * ',
  ' */',
  '',
  ''].join('\n');


// Tasks
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['./scss/**/*.scss'], ['sass']);
});

gulp.task('sass', function(done) {
  console.log('~> Compiling Sass');

  return gulp.src('./scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
    // .on('end', done);
});

gulp.task('default', ['serve']);
