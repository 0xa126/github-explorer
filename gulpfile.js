'use strict';

var gulp = require('gulp');
var ignore = require('gulp-ignore');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var express = require('express');

var paths = {
  scripts: ['./app/**/*.js'],
  styles: ['./app/**/*.less'],
  views: ['./app/**/*.html']
};

// Set up an express server (but not starting it yet)
var server = express();
// Use our 'app' folder as root folder
server.use(express.static('./app'));
// Always return index.html
server.all('*', function(req, res) {
  res.sendFile('index.html', { root: './app' });
});
server.listen(8000);
livereload.listen();

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(ignore.exclude(/bower_components/))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('less', function() {
  return gulp.src('./app/app.less')
    .pipe(less({
      paths: []
    }))
    .pipe(gulp.dest('./app'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['jshint']).on('change', livereload.changed);
  gulp.watch(paths.styles, ['less']);
  gulp.watch(paths.views, []).on('change', livereload.changed);
});

gulp.task('default', ['jshint', 'less', 'watch']);
