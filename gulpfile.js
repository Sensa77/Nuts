const gulp = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const htmlmin = require("gulp-htmlmin");
const sync = require("browser-sync").create();
const replace = require("gulp-replace");

// Paths

const paths = () => {
  return gulp
    .src("dist/*.html")
    .pipe(
      replace(/(<link rel="stylesheet" href=")styles\/(index.css">)/, "$1$2")
    )
    .pipe(replace(/(<script src=")scripts\/(index.js">)/, "$1$2"))
    .pipe(gulp.dest("dist"));
};

exports.paths = paths;

// Styles

const styles = () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("src"))
    .pipe(gulp.dest("dist"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "src",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Scripts

const scripts = () => {
  return gulp
    .src("src/scripts/index.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest("dist"))
    .pipe(sync.stream());
};

exports.scripts = scripts;

// HTML

const html = () => {
  return gulp
    .src("src/*.html")
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(sync.stream());
};

exports.html = html;

// Watcher

const watcher = () => {
  gulp.watch("src/*.html", gulp.series(html, paths));
  gulp.watch("src/scss/**/*.scss", gulp.series(styles));
  gulp.watch("src/scripts/**/*.js", gulp.series(scripts));
};

exports.default = gulp.series(styles, server, watcher);
