module.exports = {
    options: {
      livereload: true,
    },
    js: {
      files: [
        'Gruntfile.js',
        '<%= app %>/**/*.js',
        '<%= app %>/**/*.es6'
      ],
      tasks: [
        'newer:jshint'
      ],

    }
};