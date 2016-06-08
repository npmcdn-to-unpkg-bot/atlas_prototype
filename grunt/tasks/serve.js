module.exports = function(grunt) {
  grunt.registerTask('serve', [
    'connect',
    //'jshint',
    //'angularTemplates',
    'watch'
  ]);
};