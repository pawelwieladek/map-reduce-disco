var gulp = require("gulp");
var mocha = require("gulp-spawn-mocha");
var babel = require("gulp-babel");
var shell = require("gulp-shell");
var del = require("del");

gulp.task("clean", function (cb) {
  del([
    "dist/**/*.js",
    "target/logs-*"
  ], cb);
});

gulp.task("test", function () {
    return gulp.src(["test/**/*.test.js"], { read: false })
        .pipe(mocha({
            compilers: "js:babel/register",
            reporter: "dot",
            require: "test/setup.js"
        }));
});

gulp.task("build", ["clean"], function () {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});
