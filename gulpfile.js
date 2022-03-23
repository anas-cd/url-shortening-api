// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sass = require('gulp-sass')(require('sass')); // since gulp-sass >v5 does not have a compiler impeded 
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const terser = require('gulp-terser');


// File paths
const files = { 
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js'
}

// Sass Task
function scssTask(){
    return src(files.scssPath, { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(dest('app/dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask(){
    return src(files.jsPath, { sourcemaps: true })
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(dest('app/dist', { sourcemaps: '.' }));
}


// // Cachebust
// function cacheBustTask(){
//     var cbString = new Date().getTime();
//     return src(['index.html'])
//         .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
//         .pipe(dest('.'));
// }



// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    watch([files.scssPath, files.jsPath],
        {interval: 1000, usePolling: true}, //Makes docker work
        series(
            parallel(scssTask, jsTask),
            // cacheBustTask // incase any cach busting task is available 
        )
    );    
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask), 
    // cacheBustTask, // incase any cach busting task is available 
    watchTask
);