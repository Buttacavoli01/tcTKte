const gulp = require('gulp');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const minifyCSS = require('gulp-cssnano');
const prefix = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const paths = {
  styles: {
    src: 'app/src/styles/**/*.sass',
    dest: 'app/dist/styles/'
  },
  scripts: {
    src: 'app/src/scripts/**/*.js',
    dest: 'app/dist/scripts/'
  },
  images: {
    src: 'app/src/assets/images/*.*',
    dest: 'app/dist/assets/images/'
  },
  views: {
    src: 'app/src/views/index.pug',
    dest: 'app/dist/',
    rest: 'app/src/views/*.pug'
  }
};

gulp.task('clean', function() {
  return del(['app/dist/**/*']);
});

gulp.task('views', function () {
  return gulp.src(paths.views.src)
  .pipe(pug({
    doctype: 'html',
    filename: 'index.html'
  // ,pretty: true
  }))
  .pipe(gulp.dest(paths.views.dest));
});

gulp.task('scripts', function() {
  return gulp.src([paths.scripts.src])
    .pipe(terser())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('styles', function(done) {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(concat('main.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});


gulp.task('serve', gulp.series('styles', function() {
  browserSync.init({
    server: ['app/dist/'],
    port: 3000
  });
  gulp.watch(paths.styles.src, gulp.series('styles'));
  gulp.watch(paths.scripts.src, gulp.series('scripts'));
  gulp.watch(paths.views.rest, gulp.series('views'));
  gulp.watch('app/dist/*').on('change', browserSync.reload);
}));

gulp.task('imgMin', function() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('run', gulp.series('clean',
 gulp.parallel('styles', 'scripts', 'imgMin', 'views'),
  'serve',
    function watcher(done) {
      gulp.watch(paths.scripts.src,
        gulp.parallel('scripts')
      );
      gulp.watch(
        'app/dist/',
        browserSync.reload()
      );
      done();
    }
  )
);
