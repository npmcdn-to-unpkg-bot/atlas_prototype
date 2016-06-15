module.exports = {
  options: {
    livereload: true,
  },
  es6: {
    files: [
      '<%= app %>/**/*.es6'
    ],
    tasks: [
      'newer:eslint',
      'newer:babel:dev'
    ]
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
      '<%= app %>/**/*.js',
      '!<%= app %>/**/*-compiled.js',
      '!<%= app %>/**/*.js.map'
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