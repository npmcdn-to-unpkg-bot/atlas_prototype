module.exports = {
  options: {
    livereload: true,
  },
  HTML: {
    files: ['<%= app %>/**/*.html'],
    tasks: ['ngtemplates:app']
  },
  js: {
    files: [
      'Gruntfile.js',
      'grunt/**/*.js',
      '<%= app %>/**/*.js',
      '<%= app %>/**/*.es6'
    ],
    tasks: [
      'newer:jshint'
    ],
  },
  sass: {
    files: [
    '<%= app %>/**/*.scss',
    ],
    tasks: [
      'sass:dev'
    ],
  }
};