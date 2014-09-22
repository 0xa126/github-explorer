var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    connect = require('gulp-connect');

var paths = {
  scripts: ['./app/app.js'],
  styles: ['./app/app.less']
};

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('less', function() {
  return gulp.src(paths.styles)
    .pipe(less({
      paths: []
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('connect', function() {
  connect.server({
    root: './app',
    livereload: true
  });
});

gulp.task('watch', ['connect'], function() {
  gulp.watch(paths.scripts, ['jshint']);
  gulp.watch(paths.styles, ['less']);

  gulp.src('./app/**').pipe(connect.reload());
});

gulp.task('default', ['jshint', 'less', 'watch']);
