let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  del = require('del'),
  tinypng = require('gulp-tinypng-compress'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', async function () {
  del.sync('dist')
})

gulp.task('tinypng', function () {
  gulp.src('app/img/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'cjSY3sc8KDH86mmDJhP4RwTwZdFK3mlZ'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/pixel-glass/styles.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/slick-carousel/slick/slick-theme.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'app/libs/fancybox/js/jquery.fancybox.min.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/pixel-glass/script.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('export', function () {
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));

  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));