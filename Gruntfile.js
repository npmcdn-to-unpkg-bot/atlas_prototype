module.exports = function (grunt) {
    grunt.initConfig({
        bower_concat: require('./grunt/bower-concat'),
        clean: require('./grunt/clean'),
        concat: require('./grunt/concat'),
        copy: require('./grunt/copy'),
        ngtemplates: require('./grunt/angular-templates'),
        tags: require('./grunt/script-link-tags')
    });

    grunt.registerTask('build', [
        'clean:build',
        'copy:build',

        'build-js',
        'build-css',

        'clean:temp'
    ]);

    /**
     * The output of build-js is a file 'build/atlas.js'
     */
    grunt.registerTask('build-js', [
        'bower_concat',
        'ngtemplates',
        'concat:js',
        'tags:js'
    ]);

    grunt.registerTask('build-css', [
        //'tags:css'
    ]);

    grunt.registerTask('test', [
        //'jshint',
        //'eshint',
        //'karma:all'
    ]);

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-script-link-tags');
};