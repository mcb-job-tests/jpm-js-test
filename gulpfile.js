let gulp        = require('gulp');
let exec        = require('child_process').exec;
let spawn       = require('child_process').spawn;
let nodemon     = require('gulp-nodemon');
let mocha       = require('gulp-mocha');
let should      = require('should');
let runSequence = require('run-sequence');
let run         = require('gulp-run');
let gutil       = require('gulp-util');


function runCommand(command) {
    return function (cb) {
        exec(command, function (err, stdout, stderr) {
            gutil.log(stdout);
            gutil.log(stderr);
            cb(err);
        });
    }
}

gulp.task('start-react-front-end', runCommand('cd client-sales-app && npm start'));

gulp.task('start-mongo-db-server', runCommand('start mongod --dbpath C:/data/db/'));

gulp.task('run-mocha-chai-tests', function() {
    return gulp.src(['restapiserver/test/*.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }));
});

gulp.task('start-rest-api-server', function () {
    nodemon({
        script: 'restapiserver/server.js'
        , ext: 'js css html json'
        , env: { 'NODE_ENV': 'development' }
    })
});


gulp.task('run-tests-and-start-rest-api-server', function(cb){
    runSequence('run-mocha-chai-tests', 'start-rest-api-server', 'start-react-front-end', cb);
});

gulp.task('default', function(cb){
    runSequence(['start-mongo-db-server', 'run-tests-and-start-rest-api-server'], cb);
});