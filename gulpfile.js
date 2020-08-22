var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  webpack = require('webpack-stream'),
  server = require('gulp-express'),
  VueLoaderPlugin = require('vue-loader/lib/plugin');


gulp.task('server', function () {
  // Start the server at the beginning of the task
  server.run(['./assets/server/app.js']);
  gulp.watch('./assets/scss/**/*.scss', ['sass-dev']);
  gulp.watch(['./assets/js/**/*.js', "./assets/js/**/*.vue"], ['scripts-dev']);
});

gulp.task('sass', function() {
  return gulp.src('./assets/scss/app.scss')
    .pipe(sass({outputStyle: 'compressed', precision: 4}).on('error', sass.logError))
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest('./web/css/'));
})

gulp.task('sass-dev', function() {
  return gulp.src('./assets/scss/app.scss')
    .pipe(sass({outputStyle: 'expanded', precision: 4}).on('error', sass.logError))
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest('./web/css/'));
})

gulp.task('scripts', function() {
  return gulp.src('./assets/js/app.js')
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'app.min.js',
      },
      resolve: {
        alias: {
          vue: 'vue/dist/vue.min.js',
          //vue: 'vue/dist/vue.js' dev mode
        }
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'vue-loader'
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                "presets": [
                  [
                    "@babel/preset-env",
                    {
                      "targets": {
                        "esmodules": true
                      }
                    }
                  ]
                ]
              }
            }
          },
        ]
      },
      plugins: [
        new VueLoaderPlugin()
      ]
  }))
  .on('error', function handleError() {
    this.emit('end'); // Recover from errors
  })
  .pipe(gulp.dest('./web/js'));
});

gulp.task('scripts-dev', function() {
  return gulp.src('./assets/js/app.js')
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'app.min.js',
      },
      resolve: {
        alias: {
          vue: 'vue/dist/vue.js'
        }
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'vue-loader'
          },
        ]
      },
      plugins: [
        new VueLoaderPlugin()
      ]
    }))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./web/js'));
});


gulp.task('watch-dev', function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass-dev']);
  gulp.watch(['./assets/js/**/*.js', "./assets/js/**/*.vue"], ['scripts-dev']);
});

gulp.task('build', ['sass', 'scripts']);
gulp.task('build-dev', ['sass-dev', 'scripts-dev']);
