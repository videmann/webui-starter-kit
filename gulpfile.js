var gulp = require('gulp'),
    look = require('gulp-watch'),
    rigg = require('gulp-rigger'),
    sass = require('gulp-sass'),
    pref = require('gulp-autoprefixer'),
    ugly = require('gulp-uglify'),
    srcm = require('gulp-sourcemaps'),
    conc = require('gulp-concat'),
    sync = require('browser-sync');

gulp.task('html', function(cb){
    gulp.src('src/*.html')
    .pipe(rigg())
    .pipe(gulp.dest('dist/'))
    .pipe(sync.stream());
    
    cb();
});

gulp.task('styles', function(cb) {
	return gulp.src(['src/sass/**/*.sass'])
    .pipe(sass({outputStyle: 'compressed', includePaths: [__dirname + '/node_modules']}))
	.pipe(conc('styles.min.css'))
	.pipe(pref({grid: true, overrideBrowserslist: ['last 10 versions']}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(sync.reload({stream: true}));

    cb();
});

gulp.task('fonts', function(cb) {
    gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts/'))
})

gulp.task('scripts', function (cb) {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery-validation/dist/jquery.validate.min.js',
        'node_modules/lodash/lodash.min.js',
        'src/js/main.js'
    ])
    .pipe(rigg())
    .pipe(srcm.init())
    .pipe(conc('main.min.js'))
    .pipe(ugly())
    .pipe(srcm.write('main'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(sync.reload({stream: true}));

    cb();
});

gulp.task('browser-sync', function(cb) {
    sync({
        server: {
            baseDir: 'dist'
        },
        notify: false,
        // online: false, // Work offline without internet connection
        // tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
    });

    cb();
});
function bsReload(done) { sync.reload(); done(); };

gulp.task('watch', function(cb) {
	gulp.watch('src/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch(['src/js/main.js'], gulp.parallel('scripts'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    
    cb();
});

gulp.task('default',  gulp.parallel('html', 'styles', 'scripts', 'browser-sync', 'watch'));