module.exports = function (grunt) {
    var jsFiles = require('./config/js-files'),
        cssFiles = require('./config/css-files'),
        buildId;

    buildId = grunt.config.get('buildId');

    return {
        options: {
            sourceMap: true
        },
        js: {
            src: jsFiles,
            dest: 'build/atlas.' + buildId + '.js'
        },
        css: {
            src: cssFiles,
            dest: 'build/atlas.' + buildId + '.css'
        }
    };
};