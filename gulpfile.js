var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync').create(),
    del          = require('del');
    /*cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'); // Подключаем библиотеку для переименования файлов*/

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true})) //browser-sync будет не полностью обновлять css "инжектить"
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './app'
        },
        notify: false //отключаем уведомления у browser-sync
    });
});

/*gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/!**!/!*.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});*/

gulp.task('watch', ['browser-sync', 'sass'], function () {  //в квадратных скобках перечисляем, что нужно выполнить до запуска watch
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'sass'], function() {

    var buildImg = gulp.src('app/img/**/*.*') //Переносим картинки в продакшен
        .pipe(gulp.dest('dist/img'))

    var buildCss = gulp.src('app/css/*.*') // Переносим css в продакшен
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);