module.exports = function(grunt) {
  grunt.registerTask('serve-dev', [
    //'copy:build',
    'sass:dev',
    'wiredep:dev',
    //'concat:vendorJS',
    //'concat:vendorCSS',
    'jshint',
    'ngtemplates',
    'connect',
    'watch'
  ]);
};