const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const {parallel} = require("gulp");


const BUILD_JS_FOLDER = './dist/js';
const BUILD_CSS_FOLDER = './dist/scss';
const SRC_FOLDER = ['./src/js/app.js', './src/js/Element.js', './src/js/Messages.js', './src/js/Burger.js',
    './src/js/IngredientsData.js', './src/js/Price.js'];
const SRC_FOLDER_SCSS = './src/scss/*.scss';


function watcher() {
    return gulp.watch(SRC_FOLDER, jsBuild);
}

function jsBuild() {
    return gulp.src(SRC_FOLDER)
        .pipe(sourcemaps.init())
        .pipe(minify())
        .pipe(concat('build.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(BUILD_JS_FOLDER))
}

function scssTask() {
    return gulp.src(SRC_FOLDER_SCSS)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(BUILD_CSS_FOLDER))
}

gulp.task('default', gulp.series(parallel(jsBuild, scssTask), watcher));