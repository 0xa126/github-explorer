'use strict';

var gulp = require('gulp');
var ignore = require('gulp-ignore');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var livereload = require('connect-livereload');
var express = require('express');
var livereloadPort = 35729;
var serverPort = 8000;

var paths = {
  scripts: ['./app/**/*.js'],
  styles: ['./app/**/*.less'],
  views: ['./app/**/*.html']
};

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({ port: livereloadPort }));
// Use our 'app' folder as root folder
server.use(express.static('./app'));
// Always return index.html
server.all('*', function(req, res) {
  res.sendFile('index.html', { root: './app' });
});

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
    .pipe(gulp.dest('./app'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['jshint']).on('change', function(event) {
    gulp.src(event.path)
      .pipe(refresh());
  });

  gulp.watch(paths.styles, ['less']).on('change', function() {
    gulp.src('./app/app.css')
      .pipe(refresh());
  });
  
  gulp.watch(paths.views, []).on('change', function(event) {
    gulp.src(event.path)
      .pipe(refresh());
  });
});

gulp.task('serve', function() {
  // Start webserver
  server.listen(serverPort);
  // Start live reload
  refresh.listen(livereloadPort);
});

gulp.task('default', ['jshint', 'less', 'serve', 'watch']);
