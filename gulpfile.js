var gulp = require('gulp');
var less= require('gulp-less');
var concat= require('gulp-concat'); //文件合并
var cleanCSS = require('gulp-clean-css'); //css压缩
var del = require('del'); //删除文件
var babel = require('gulp-babel')
var uglify = require('gulp-uglify')
var rename = require("gulp-rename");
var rev = require("gulp-rev");
// const imagemin = require('gulp-imagemin')//图片压缩
var revCollector = require('gulp-rev-collector');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var src={
	css:"./src/css",
	html:"./src/html",
	js:"./src/js",
}
var build={
	css:"./build/css",
	html:"./build/html",
	js:"./build/js",
}




gulp.task('del',function() {
	del(['./build/'])
})

gulp.task('less', function () {
	 gulp.src('./src/css/*.less')
	    .pipe(less())
	    // .pipe(rev())
	    // .pipe(gulp.dest(build.css))
	    // .pipe(concat('all.css'))
	    .pipe(gulp.dest('./build/css/'))
	 //    .pipe(reload({
		// stream:true
	 //     }))
	    // .pipe(rev.manifest())
	    // .pipe(gulp.dest('./build/rev/css/'))
	 
});


gulp.task('script',function(){
	gulp.src('./src/js/*.js')
	       .pipe(babel({
	           presets: ['es2015']
	       }))
	 //       .pipe(reload({
		// stream:true
	 //        }))
	       .pipe(gulp.dest('./build/js/'))
})

gulp.task('html',function() {
	console.log('ok')
	gulp.src(src.html+'/*.html')
	// .pipe(reload({
	// 	stream:true
	// }))
	.pipe(gulp.dest('./build/html'))
	
})

gulp.task('rev', function () {
	gulp.src(['build/rev/**/*.json', './src/html/*.html'])
	 .pipe( revCollector({}) )
	 .pipe(gulp.dest('./build/html/'))
})
gulp.task('server', function() {
    	browserSync.init({
	        server: {
	            baseDir: "./"
	        },
	        port:3003        
    	});
	    gulp.watch('src/css/*.less',["serverless"])
	    gulp.watch('src/js/*.js',["serverscript"])
	    gulp.watch('src/html/*.html',["serverhtml"])

});

gulp.task('serverless', function () {
	 gulp.src('./src/css/*.less')
	    .pipe(less())
	    // .pipe(rev())
	    // .pipe(gulp.dest(build.css))
	    // .pipe(concat('all.css'))
	    .pipe(gulp.dest('./build/css/'))
	    .pipe(reload({
		stream:true
	     }))
	    // .pipe(rev.manifest())
	    // .pipe(gulp.dest('./build/rev/css/'))
	 
});


gulp.task('serverscript',function(){
	gulp.src('./src/js/*.js')
	       .pipe(babel({
	           presets: ['es2015']
	       }))
	       .pipe(reload({
		stream:true
	        }))
	       .pipe(gulp.dest('./build/js/'))
})

gulp.task('serverhtml',function() {
	console.log('ok')
	gulp.src(src.html+'/*.html')
	.pipe(reload({
		stream:true
	}))
	.pipe(gulp.dest('./build/html'))
	
})


gulp.task('default', ['del', 'less','script','html','server'])
// gulp.task('default', ['watch', 'scripts', 'images']);


// gulp.task('concat', function () {
// 	 gulp.src('./src/css/*.less')
// 	    .pipe(less())
// 	    .pipe(concat('all.css',{newLine :'/*____*/'}))
// 	    // .pipe(cleanCSS({compatibility: 'ie8'}))
// 	    .pipe(cleanCSS({debug: true}, (details) => {
// 	         console.log(`${details.name}: ${details.stats.originalSize}`);
// 	         console.log(`${details.name}: ${details.stats.minifiedSize}`);
// 	     }))
// 	    .pipe(gulp.dest('./build/css/'));
// });


// gulp.task('env', () =>
//  	gulp.src('./src/js/*.js')
// 	       .pipe(babel({
// 	           presets: ['env']
// 	       }))
// 	       .pipe(concat('all.js'))
// 	       .pipe(uglify())
// 	       .pipe(rename('./all.min.js'))
// 	       .pipe(gulp.dest('./build/js/'))
// );


// gulp.task('ot', () =>
//  	gulp.src('./src/js/*.js')
// 	       .pipe(babel({
// 	           presets: ['env']
// 	       }))
// 	       .pipe(concat('all.js'))
// 	       .pipe(uglify())
// 	        .pipe(rename(function (path) {
// 		    path.dirname;
// 		    path.basename += "-goodbye";
// 		    path.extname = ".js"
// 		  }))
// 	       .pipe(gulp.dest('./src/js/'))
// );
