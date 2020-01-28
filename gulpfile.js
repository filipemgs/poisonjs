var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var clean = require('gulp-clean');
var gulp = require('gulp');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {
  return browserify({
    entries: 'src/browser/components/index.jsx',
    debug: true,
    transform: [reactify],
    extensions: ['.jsx']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('deploy/browser/js/'));
});

gulp.task('watch', function() {
  gulp.watch([
    'gulpfile.js',
    'lib/**/*.js',
    'src/**/*.jsx'],
    ['scripts']);
});

gulp.task('clean', function () {
  return gulp.src('deploy/browser/js', {read: false})
    .pipe(clean());
});

gulp.task('default', ['scripts']);
