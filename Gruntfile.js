module.exports = function (grunt) {
    grunt.initConfig({
        bower_concat: require('./grunt/bower-concat'),
        clean: require('./grunt/clean'),
        concat: require('./grunt/concat'),
        connect: require('./grunt/connect'),
        copy: require('./grunt/copy'),
        jshint: require('./grunt/jshint'),
        karma: require('./grunt/karma'),
        ngtemplates: require('./grunt/angular-templates'),
        sass: require('./grunt/sass'),
        tags: require('./grunt/script-link-tags'),
        watch: require('./grunt/watch')
    });

    grunt.registerTask('build', [
        'clean:build',
        'copy:index',

        'build-js',
        'build-css',

        'clean:temp'
    ]);

    grunt.registerTask('test-js', [
        'jshint',
        //'eshint',
        'karma:coverage'
    ]);

    grunt.registerTask('test-css', [
        //een_of_andere_scss_linter
    ]);

    /**
     * The output of build-js is a single file 'build/atlas.js'
     */
    grunt.registerTask('build-js', [
        'bower_concat:js',
        'ngtemplates',
        'concat:js',
        'tags:js'
    ]);

    /**
     * The output of build-css is a single file 'build/atlas.css'
     */
    grunt.registerTask('build-css', [
        'bower_concat:css',
        'sass',
        'concat:css',
        'tags:css'
    ]);

    grunt.registerTask('default', [
        'build',
        'connect:build',
        'watch'
    ]);

    grunt.registerTask('test', [
        'test-js',
        'test-css'
    ]);

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-script-link-tags');
};