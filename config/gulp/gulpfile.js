const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const rimraf = require('rimraf');
const env = require('gulp-env');
const runSequence = require('run-sequence');

const ROOT = process.cwd();

const project = ts.createProject(`${ROOT}/tsconfig.json`, {
  typescript: require('typescript'),
});

// ============== CLEAN ================
gulp.task('clean-lib', cb => {
  rimraf('./lib', cb);
});

gulp.task('clean-es', cb => {
  rimraf('./es', cb);
});

gulp.task('clean-libTs', cb => {
  rimraf('./libTs', cb);
});

gulp.task('clean', ['clean-libTs', 'clean-lib', 'clean-es']);

// ============== BUILD ================
// This is the only way I found to make source maps works...

gulp.task('compile-es5', () => {
  const envs = env.set({
    NODE_ENV: 'commonjs',
  });

  return gulp.src(['{types,src}/**/*.{ts,tsx}', 'typings/main.d.ts'], { cwd: ROOT })
    .pipe(envs)
    .pipe(sourcemaps.init())
      .pipe(ts(project))
      .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(rename(path => {
      path.dirname = path.dirname.replace(/\/*src\/*/, ''); // eslint-disable-line
    }))
    .pipe(gulp.dest('./lib'));
});

gulp.task('build-es5', (cb) => (
  runSequence(
    'clean-lib',
    'compile-es5',
    cb
  )
));

gulp.task('compile-es2015', () => {
  const envs = env.set({
    NODE_ENV: 'es',
  });

  return gulp.src(['{types,src}/**/*.{ts,tsx}', 'typings/main.d.ts'], { cwd: ROOT })
    .pipe(envs)
    .pipe(sourcemaps.init())
      .pipe(ts(project))
      .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(rename(path => {
      path.dirname = path.dirname.replace(/\/*src\/*/, ''); // eslint-disable-line
    }))
    .pipe(gulp.dest('./es'));
});

gulp.task('build-es2015', (cb) => (
  runSequence(
    'clean-es',
    'compile-es2015',
    cb
  )
));

gulp.task('build', ['build-es5', 'build-es2015']);

// ============== WATCH ================
gulp.task('watch-es5', ['build-es5'], () => {
  gulp.watch('{types,src}/**/*.{ts,tsx}', ['compile-es5']);
});

gulp.task('watch-es2015', ['build-es2015'], () => {
  gulp.watch('{types,src}/**/*.{ts,tsx}', ['compile-es2015']);
});
