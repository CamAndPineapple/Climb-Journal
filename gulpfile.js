var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src('./public/app/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/build/js'));
});

gulp.task('watch', function() {
    gulp.watch('./public/app/js/**/*.js', ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);
