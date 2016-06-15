module.exports = function(grunt) {
  grunt.registerTask('serve-dev', [
    //'copy:build',
    'jshint',
    'eslint',
    'babel:dev',
    'sass:dev',
    'wiredep:dev',
    //'concat:vendorJS',
    //'concat:vendorCSS',
    'ngtemplates',
    'connect',
    'watch'
  ]);
};