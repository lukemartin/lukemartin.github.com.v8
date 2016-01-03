// Imports
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var sass = require('gulp-sass');
var bourbon = require('node-bourbon');

var ts = require('gulp-typescript');

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

  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['ts/**/*.ts'], ['ts']);
  gulp.watch(['**/*.html'], browserSync.reload);
});

gulp.task('sass', function() {
  console.log('~> Compiling Sass');

  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      includePaths: bourbon.includePaths
    }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('ts', function() {
  console.log('~> Compiling TypeScript');

  return gulp.src('ts/app.ts')
    .pipe(sourcemaps.init())
    .pipe(ts({
      noImplicitAny: false,
      outFile: 'app.js',
      target: 'ES5',
      module: 'system'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
