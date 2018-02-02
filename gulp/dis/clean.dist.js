/**
 * 清除原文件
 */

var gulp = require('gulp'),

    clean = require('gulp-clean')

    ;//服务器

function cleanDist() {
    //

    return gulp.src('dis')
        
        .pipe(clean());

}

module.exports = cleanDist;