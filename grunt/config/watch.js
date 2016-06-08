module.exports = {
  options: {
    livereload: true,
  },
  // werkt nog niet, geen prio later naar kijken, taak faalt om onduidelijke reden
  // HTML: {
  //   files: ['<%= app %>/**/*.html'],
  //   tasks: ['angularTemplates']
  // },
  js: {
    files: [
      'Gruntfile.js',
      'grunt/**/*.js',
      '<%= app %>/**/*.js'
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