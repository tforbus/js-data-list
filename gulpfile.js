var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var iife = require('gulp-iife');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    return gulp
    .src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(iife())
    .pipe(concat('js-data-list.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'));
});
