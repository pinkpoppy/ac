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
var spritesmith = require('gulp.spritesmith')
var buffer = require('vinyl-buffer')

//var pngquant = require('imagein-pnquant')


gulp.task('default',['watch:all'])

gulp.task('watch:all',
          [
						'sprites',
						'styles',
            'js',
            'page',
					],
          function(){
            gulp.watch(['src/js/*.js',
                        'src/page/**/*',
                        'src/resources/*.png',
                        'src/styl/**/*',
                        'src/resources/*.png'],function(){
              gulp.start('styles')
              gulp.start('js')
              gulp.start('page')
              gulp.start('sprites')
            })
          })
gulp.task('styles', function () {
	gulp.src(['src/styl/main.styl'])
		.pipe(sourcemaps.init())
		.pipe(stylus({'include css':true}))
		.pipe(sourcemaps.write())
		.pipe(minifyCSS({keepSpecialComments:1}))
		.pipe(gulp.dest('build/'));
})

gulp.task('js',function(){
  gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(jsmin())
      .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest('build/'))
})



gulp.task('page',function(){
  gulp.src(['src/page/**/*'])
    .pipe(gulp.dest('build/page/'))
})


gulp.task('sprites',function(){
	var spriteData = gulp.src('src/resources/*.png')
		.pipe(spritesmith({
			imgName:'sprite.png',
			cssName:'sprite.styl',
			algorithm: 'alt-diagonal'
		}))
		return spriteData.pipe(gulp.dest('src/styl/'))
})