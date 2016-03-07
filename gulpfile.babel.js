'use strict';

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import run from 'gulp-run';
import util from 'gulp-util';


gulp.task('start', function () {
  gulp.src('./')         
    .pipe(run('npm run compile && node lib/server.js'))  
  	util.log("Listen: http://localhost:3000")
});

gulp.task('test', function () {
  gulp.src('./')         
    .pipe(run('npm run compile && mocha --compilers js:babel-core/register'))  
});


gulp.task('prepublish', function () {
  gulp.src('./')         
    .pipe(run('babel --presets es2015 -d lib/ src/'))  
});

gulp.task('compile', function () {
  gulp.src('./')         
    .pipe(run('babel --presets es2015 -d lib/ src/'))  
});