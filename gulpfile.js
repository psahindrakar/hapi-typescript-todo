'use strict'

let gulp = require('gulp');
let rimraf = require('gulp-rimraf');
let sourceMaps = require('gulp-sourcemaps');
let tsc = require('gulp-typescript');
let nodemon = require('gulp-nodemon');
var lab = require('gulp-lab');

// Variables
let tsProject = tsc.createProject('tsconfig.json');
let sourceFiles = 'src/**/*.ts';
let testFiles = 'test/**/*.ts';
let outDir = require('./tsconfig.json').compilerOptions.outDir;
let entryPoint = require('./package.json').main;
let testUnitFiles = 'build/test/unit/**/*.js';
let testFunctionalFiles = 'build/test/functional/**/*.js';

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
 
gulp.task('test', ['test:unit', 'test:api']);

gulp.task('test:unit', ['build'], function () {
    return gulp.src([testUnitFiles])
      .pipe(lab());
});

gulp.task('test:api', ['build'], function () {
    return gulp.src([testFunctionalFiles])
      .pipe(lab());
});

gulp.task('default', ['test','nodemon', 'watch']);
