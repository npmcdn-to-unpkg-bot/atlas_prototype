module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish'),
  },
  all: [
    'Gruntfile.js',
    'grunt/**/*.js',
    '<%= app %>/**/*.js',
    '<%= app %>/**/*.es6'
  ]
};