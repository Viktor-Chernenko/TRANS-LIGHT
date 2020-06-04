const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify-es').default;
const babel = require("gulp-babel");
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
var pug = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');
const reload = browserSync.reload;

// === Пути ===

const src = {
   script: {
      all: './src/js/**/*',
      input: './src/js/**/*.js',
      ignore: '!/src/js/maskedinput',
      output: {
         we: './js'
      },
   
      output_name: 'script.js'
   },

   style: {
      input: {
         basis: './src/scss/style.scss',
         all: './src/scss/**/*.scss',
      },

      output: {
         we: './css',
      },

      output_name: 'style.css',
      s_maps: './'
   },

   html: {
      input: {
         basis:'./index.html',
         all: './src/pages/**/*'
      }
   },

   fonts: {
      input: './src/fonts/**/*',
      output: {
         we: './fonts'
      },
   },

   img: {
      input: './src/img/**',
      output: {
         we: './img'
      },
   },

   pug: {
      input_templates: './src/templates/elements/**/*.pug',
      input_pug: './src/templates/pug/**/*.pug',
      input_pages: './src/pages/**/*.pug',
      input_index: './src/index.pug',

      output_templates: './templates/',
      output_pages: './pages/',
      output_index: './'
   }
};

// === task ===

gulp.task('htmlbeautify', function() {
   var options = {
      indentSize: 4,
      indent_with_tabs: true,
      preserve_newlines: true,
      unformatted: [
         'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
         'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
         'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
         'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
         'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
      ]

   };
   gulp.src('./**/*.html')
      .pipe(htmlbeautify(options))
      .pipe(gulp.dest('./'))
});

gulp.task('pug_pages', function() {
   return gulp.src(src.pug.input_pages)
   .pipe(pug({pretty: true}))
   .on('error', function (err) {
      console.log(err);
      this.emit('end');
   })
   .pipe(gulp.dest(src.pug.output_pages))
   .pipe(htmlbeautify())
   .pipe(reload({ stream: true }))
});

 gulp.task('pug_index', function() {
   return gulp.src(src.pug.input_index)
   .pipe(pug({pretty: true}))
   .on('error', function (err) {
      console.log(err);
      this.emit('end');
   })
   .pipe(gulp.dest(src.pug.output_index))
   .pipe(htmlbeautify())
   .pipe(reload({ stream: true }))
 });

 gulp.task('pug_templates', function() {
   return gulp.src(src.pug.input_templates)
   .pipe(pug({pretty: true}))
   .on('error', function (err) {
      console.log(err);
      this.emit('end');
   })
   .pipe(gulp.dest(src.pug.output_templates))
   .pipe(htmlbeautify())
   .pipe(reload({ stream: true }))
 });

gulp.task('styles', () => {
   return gulp.src(src.style.input.basis)
   .pipe(sourcemaps.init())
   .pipe(sass())
   .on('error', function (err) {
      console.log(err);
      this.emit('end');
   })
   .pipe(concat(src.style.output_name))
   .pipe(autoprefixer({
      overrideBrowserslist: ['last 4 versions'], 
      cascade: false
   }))
   // Сжатие CSS
   // .pipe(cleanCSS({
   //    level: 2
   // }))
   .pipe(sourcemaps.write(src.style.s_maps))
   .pipe(gulp.dest(src.style.output.we))
   .pipe(reload({ stream: true }))
});

gulp.task('fonts', () => {
   return gulp.src(src.fonts.input)
   .pipe(gulp.dest(src.fonts.output.we))
   .pipe(reload({ stream: true }))
});

gulp.task('scripts', () => {
   return gulp.src(src.script.input, src.script.ignore)
   .pipe(babel())
   // Сжатие JS
   // .pipe(uglify({
   //    toplevel: true
   // }))
   .on('error', function (err) {
      console.log(err);
      this.emit('end');
   })
   .pipe(gulp.dest(src.script.output.we))
   .pipe(reload({ stream: true }))
});

gulp.task('scripts-2', () => {
   return gulp.src(src.script.input)
   .pipe(gulp.dest(src.script.output.we))
   .pipe(reload({ stream: true }))
});

gulp.task('jsAll', () => {
   return gulp.src(src.script.all)
   .pipe(babel())
   .pipe(gulp.dest(src.script.output.we))
   .pipe(reload({ stream: true }))
});

gulp.task('del', () => {
   return del([src.style.output.we, src.script.output.we, src.fonts.output.we, src.img.output.we, src.pug.output_pages, src.pug.output_templates, './index.html']);
});

gulp.task('img-compress', () => {
   return gulp.src(src.img.input)
   .pipe(imagemin({
      progressive: true
   }))
   .on('error', function (err) {
      console.log(err);
      this.emit('end');
   })
   .pipe(gulp.dest(src.img.output.we))
   .pipe(reload({ stream: true }))
});

gulp.task('watch', () => {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });
});

gulp.watch(([src.pug.input_pug, src.pug.input_index, src.pug.input_pages]), gulp.series('pug_templates', 'pug_pages', 'pug_index'))
gulp.watch(src.img.input, gulp.series('img-compress'))
gulp.watch((src.style.input.all), gulp.series('styles'))
gulp.watch(src.fonts.input, gulp.series('fonts'))
gulp.watch(src.script.input, gulp.series('scripts-2', 'scripts'))
gulp.watch(src.html.input.basis);


gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress', 'fonts', 'jsAll', 'pug_templates', 'pug_pages', 'pug_index'), 'watch'));