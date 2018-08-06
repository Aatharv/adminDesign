var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    jshint     = require('gulp-jshint'),
    htmlclean = require('gulp-htmlclean'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    deporder = require('gulp-deporder'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),

    devBuild = (process.env.NODE_ENV !== 'production'),
    folder = {
        src: 'source/',
        build: 'public/'
    };

    input  = {
        'sass': ['source/assets/scss/*/*.scss'],
        'css': ['source/assets/scss/*/*.css'],
        'javascript': ['config/*/*.js'],
        'vendorjs': 'assets/js/*/*.js',
        'images' : 'assets/images/**/*'
      },

      output = {
        'stylesheets': 'public/assets/stylesheets/',
        'javascript': 'public/assets/javascript/'
      };
// image processing
gulp.task('images', function() {
    var out = folder.build + 'assets/images/';
    return gulp.src(folder.src + input.images)
      .pipe(newer(out))
      .pipe(imagemin({ optimizationLevel: 5 }))
      .pipe(gulp.dest(out));
  });

// Vendor JavaScript processing
gulp.task('SCSS', function() {
  var jsbuild = gulp.src(folder.src + 'assets/scss/*')
   .pipe(deporder())
   .pipe(concat('vendor.min.css'));

 if (!devBuild) {
   jsbuild = jsbuild
     .pipe(stripdebug())
     .pipe(uglify());
 }
 return jsbuild.pipe(gulp.dest(folder.build));
});

 // HTML processing
gulp.task('html', ['images'] , function() {
    var
      outIndex = folder.build,
      out = folder.build + 'views/',
      page = gulp.src(folder.src + '*.html')
        .pipe(newer(outIndex));
  
    // minify production code
    if (!devBuild) {
      page = page.pipe(htmlclean());
    }
  
    return page.pipe(gulp.dest(outIndex));
});

 // HTML processing
 gulp.task('allhtml', ['images', 'SCSS'] , function() {
  var
    out = folder.build + 'modules/',
    page = gulp.src(folder.src + 'modules/**/views/*.html')
      .pipe(newer(out));

  // minify production code
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});

// Vendor JavaScript processing
gulp.task('angular-js', function() {
    var jsbuild = gulp.src(folder.src + 'assets/js/angular/*')
     .pipe(deporder())
     .pipe(concat('angular.min.js'));
 
   if (!devBuild) {
     jsbuild = jsbuild
       .pipe(stripdebug())
       .pipe(uglify());
   }
   return jsbuild.pipe(gulp.dest(folder.build));
 });


 
// Vendor JavaScript processing
gulp.task('vendor-js', function() {
     var jsbuild = gulp.src(folder.src + 'assets/js/*')
      .pipe(deporder())
      .pipe(concat('vendor.main.js'));
  
    if (!devBuild) {
      jsbuild = jsbuild
        .pipe(stripdebug())
        .pipe(uglify());
    }
    return jsbuild.pipe(gulp.dest(folder.build));
  });
 

// Angular  JavaScript processing
gulp.task('module-js', function() {


    var sources = [
        folder.src + 'config/*',
        folder.src + 'modules/*/*.module.client.js',
        folder.src + 'modules/*/config/*.routes.js',
        folder.src + 'modules/**/**/*.services.client.js',
        folder.src + 'modules/**/**/*.directive.client.js',
        folder.src + 'modules/**/**/*.controller.client.js'
    ]
    var jsbuild = gulp.src(sources)
      .pipe(deporder())
      .pipe(uglify())
      .pipe(concat('app.modules.min.js'));
  
    if (!devBuild) {
      jsbuild = jsbuild
        .pipe(stripdebug())
        .pipe(uglify());
    }
  
    return jsbuild.pipe(gulp.dest(folder.build));
  
  });



gulp.task('run', ['html', 'allhtml', 'vendor-js', 'angular-js', 'module-js'])
gulp.task('default', ['run']);
