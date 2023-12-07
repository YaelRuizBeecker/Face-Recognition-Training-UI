const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function css(){
    return src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(dest('./src/css/'))
}

exports.css = css
exports.default = css