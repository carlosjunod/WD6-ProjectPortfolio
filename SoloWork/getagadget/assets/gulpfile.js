var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
const babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];
var jsPaths = [
  'bower_components/jquery/dist/jquery.js'
]

gulp.task('browser-sync', function(){
    browserSync.init({
        proxy: "localhost:3100"
    })
    console.log('reload in browserSync');
})

gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(browserSync.reload({
        stream:true
    }))
    .pipe(gulp.dest('../public/stylesheets'));


});

gulp.task('babel', () => {
    return gulp.src('./js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('../public/javascripts'));
});



gulp.task('watch', ['browser-sync','sass'], function(){
    gulp.watch(['./scss/**/*.scss'], ['sass']).on('change', reload)
    gulp.watch(['../views/**/*.pug']).on('change', reload)
    gulp.watch(['./js/*.js'],['babel']).on('change', reload)
})
