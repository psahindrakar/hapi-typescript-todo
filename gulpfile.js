'use strict'

let gulp = require('gulp');
let rimraf = require('gulp-rimraf');
let sourceMaps = require('gulp-sourcemaps');
let tsc = require('gulp-typescript');
let nodemon = require('gulp-nodemon');

// Variables
let tsProject = tsc.createProject('tsconfig.json');
let sourceFiles = 'src/**/*.ts';
let testFiles = 'test/**/*.ts';
let outDir = require('./tsconfig.json').compilerOptions.outDir;
let entryPoint = require('./package.json').main;

gulp.task('clean', function() {
    return gulp.src(outDir, { read : false }).pipe(rimraf()); 
});

gulp.task('build', ['clean'], function() {
    let tsResult = gulp.src([sourceFiles, testFiles])
        .pipe(sourceMaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(outDir));
});

gulp.task('watch', function() {
    gulp.watch([sourceFiles], ['build']).on('change', (event) => {
        console.log(`Typescript file ${event.path} has been changed. Compiling...`);
    });
});

gulp.task('nodemon', ['build'], () => {
    nodemon({
        script: entryPoint,
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('default', ['nodemon', 'watch']);
