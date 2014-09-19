var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

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

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.scripts, ['jshint']);
  gulp.watch(paths.styles, ['less']);  
  gulp.watch('app/**').on('change', livereload.changed);
});

gulp.task('default', ['jshint', 'less', 'watch']);
