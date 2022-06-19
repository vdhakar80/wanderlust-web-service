let gulp=require("gulp");
let eslint= require("gulp-eslint")
let fs=require("fs")
let mocha = require('gulp-mocha');
let shell=require('gulp-shell');


gulp.task('lint',()=>{
    return gulp.src(['src/model/*.js','src/routes/*.js', 'src/service/*.js', 'src/utilities/*.js', 'src/app.js',
    '!node_modules/**']) //fetch the files
    .pipe(eslint()) // point the next thing we want to do, chaining the command
    .pipe(eslint({fix:true})) // to fix the lint errors
    .pipe(eslint.format()) //to display in terminal
    .pipe(gulp.dest(file => file.base))
    .pipe(eslint.format('html', fs.createWriteStream('lintReports/lint_report.html'))) // for creating lint errors in html file
    .pipe(eslint.format('checkstyle', fs.createWriteStream('lintReports/checkstyle.xml')))
    .pipe(eslint.failAfterError())
})


gulp.task('test', () => {
    return gulp.src(['test/*.js'])// fetching all test case files
      .pipe(mocha(
        {
          reporter: 'mocha-junit-reporter', //npm package to generate report
          reporterOptions: {
            mochaFile: './testReport/JUnit/file.xml' 
          }
        }
      )) //running mocha
      .on('error', console.error)
  });

  gulp.task('coverage', shell.task([
    'nyc --reporter=lcov --reporter=text mocha'
  ]));