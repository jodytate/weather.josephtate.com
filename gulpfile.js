'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var filter = require('gulp-filter');

gulp.task('clean', function () {
  del([
    'dist/**'
  ]);
});

gulp.task('move-bower', function() {
  return gulp.src(mainBowerFiles())
  .pipe(filter('*.js'))
  .pipe(gulp.dest('./app/scripts/vendor/'));
});

gulp.task('build', ['clean', 'move-bower' ]);

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});
