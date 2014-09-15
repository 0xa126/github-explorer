var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');

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
  gulp.watch(paths.scripts, ['jshint']);
  gulp.watch(paths.styles, ['less']);
});

gulp.task('default', ['jshint', 'less', 'watch']);
