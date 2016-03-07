var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

gulp.task('default', ['build']);
gulp.task('build', ['app', 'styles']);

gulp.task('app', function() {
   return browserify({
        entries: ['./js/app.js'],
        transform: [reactify],
        standalone: 'mongorun',
   })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('mongorun/static/'))
});

gulp.task('styles', function() {
   return gulp.src("styles.less")
       .pipe(less())
       .pipe(minifyCss())
       .pipe(gulp.dest('mongorun/static/'));
});