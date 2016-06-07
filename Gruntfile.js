module.exports = function (grunt) {
  //var path = require('path');
  /*
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/config'),
    jitGrunt: {
      customTasksDir: 'grunt/tasks'
    },
    data: {
      foo: 'bar' // accessible with '<%= foo %>'
    }
  });
  */
  grunt.initConfig({
    dss: {
      docs: {
        options: {
          include_empty_files: false,
          template: 'styleguide-template/'
        },
        files: {
          'docs/styleguide/': 'modules/**/*.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-dss');
};