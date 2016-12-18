var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
    return gulp.src('./assets/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/styles'));
});
gulp.task('scripts', function() {
    return gulp.src([
        './assets/js/components/Snake.js',
        './assets/js/components/Player.js',
        './assets/js/components/Cell.js',
        './assets/js/components/Peg.js',
        './assets/js/components/Grid.js',
        './assets/js/components/Dice.js',
        './assets/js/components/Timer.js',
        './assets/js/components/GameBoard.js',

    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./assets/js'));
});
gulp.task('watch', function() {
    gulp.watch('./assets/styles/*.scss', ['sass']);
    gulp.watch('./assets/js/Components/*.js',["scripts"]);
});

gulp.task('default', ['watch','sass','scripts']);
