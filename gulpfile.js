const gulp = require('gulp');
const pug = require('gulp-pug');
const mainBowerFiles = require('main-bower-files');
const clean = require('gulp-clean');
const html2pug = require('gulp-html2pug');
const BS = require('browser-sync');

var paths = {
	scss:['./src/scss/main.scss'],
	pug:['./src/index.pug']
}

gulp.task('clean',function(done){
	gulp.src('./build/*',{read:false})
		.pipe(clean());
	done();
});

gulp.task('fonts',function(done){
	gulp.src(mainBowerFiles(["**/*.{otf,eot,ttf,woff,woff2,svg}"],{
		"overrides":{
			"bootstrap-sass":{
				"main":[
					"./assets/fonts/bootstrap/*.*"
				]
			},
			"font-awesome":{
				"main":[
					"scss/*.*",
					"fonts/*.*"
				]
			}
		}
	}))
		.pipe(gulp.dest('./build/fonts'));
	done();
})

gulp.task('js',function(done){
	gulp.src(mainBowerFiles(['**/*.js'],{
		"overrides":{
			"bootstrap-sass":{
				"main":[
					"./assets/javascripts/bootstrap.min.js"
				]
			},
			"jquery":{
				"main":[
					"dist/jquery.min.js",
				]
			}
		}
	}))
		.pipe(gulp.dest('./build/js'));
	done();
})

gulp.task('pug',function(done){
	gulp.src('src/index.pug')
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest('./build'));
	done();
})

gulp.task('build',gulp.series('clean','pug','fonts','js',function(done){
	done();
}))

gulp.task('server', () => {
  BS({
    proxy: 'localhost:4000',
    files: ['build/**/*'],
    open: false,
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false,
    }
  })
})


gulp.task('html2pug',function(done){
	return gulp.src('./src/temp/*.html')
		.pipe(html2pug())
		.pipe(gulp.dest('./build'));
	done();
})

gulp.task('pug:watch',function(){
	gulp.watch(paths.pug,gulp.series('pug'));
	//gulp.watch(paths.scss,gulp.series('scss'));
})
