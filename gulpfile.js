var gulp = require('gulp')
var stylus = require('gulp-stylus')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var minify = require('gulp-minify')
var minifyCSS = require('gulp-minify-css')
var jsmin = require('gulp-jsmin')
var rename = require('gulp-rename')
var gulpif = require('gulp-if')
var sprity = require('sprity')
var imagemin = require('gulp-imagemin')
//var pngquant = require('imagein-pnquant')


gulp.task('default',['watch:all'])

gulp.task('watch:all',
          ['styles',
            'js',
            'page',
            'image:min'],
          function(){
            gulp.watch(['src/js/*.js',
                        'src/page/**',
                        'src/resources/*.png',
                        'src/styl/*.styl',
                        'src/resources/*.png'],function(){
              gulp.start('styles')
              gulp.start('js')
              gulp.start('page')
              //gulp.start('sprites')
              gulp.start('image:min')
            })
          })
gulp.task('js',function(){
  gulp.src('src/*.js')
      .pipe(concat('main.js'))
      .pipe(jsmin())
      .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest('build/'))
})

gulp.task('styles', function () {
  gulp.src(['src/main.styl'])
      .pipe(stylus({'include css':true}))
      .pipe(minifyCSS({keepSpecialComments:1}))
      .pipe(gulp.dest('build/'));
})

gulp.task('page',function(){
  gulp.src(['src/page/*'])
    .pipe(gulp.dest('build/'))
})

gulp.task('image:min',function(){
  gulp.src('src/resources/*')
      .pipe(imagemin({
        progressive:true,
        svgPlugins:[{removeViewBox:false}]
        //use:[pngquant()]
      }))
      .pipe(gulp.dest('dist/images'))
})
//
//gulp.task('sprites',function(){
//  return sprity.src({
//    src:'src/resources/*.{png}',
//    out:'build/',
//    dimension:[{
//      ratio:1,dpi:72
//    },{
//      ratio:2,dpi:192
//    }],
//    orientation:'horizontal',
//    style:'build/test',
//    cssPath:'build/'
//  })
//})