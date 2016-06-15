module.exports = {
  options: {
    livereload: true,
  },
  // bower: {
  //   files: ['bower_components/*'],
  //   tasks: ['concat:vendorJS', 'concat:vendorCSS']
  // },
  // werkt nog niet, geen prio later naar kijken, taak faalt om onduidelijke reden
  // HTML: {
  //   files: ['<%= build %>/**/*.html'],
  //   tasks: ['ngtemplates']
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