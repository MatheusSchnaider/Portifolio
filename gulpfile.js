const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

function styles() {
	return gulp.src('./assets/sass/**/*.sass')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./css'));
};

function scripts() {
	return gulp.src('./assets/js/**/*.js', { sourcemaps: true })
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('./js'));
}

function watch() {
	gulp.watch('./assets/sass/**/*.scss', gulp.series('styles'));
	gulp.watch('./assets/sass/**/*.sass', gulp.series('styles'));
	gulp.watch('./assets/js/**/*.js', gulp.series('scripts'));
};

const build = gulp.parallel(styles, scripts);

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

exports.build = build;
exports.default = build;