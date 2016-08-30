module.exports = function (grunt) {
    var jsFiles = require('./config/js-files'),
        cssFiles = require('./config/css-files'),
        uniqueIdJs,
        uniqueIdCss;

    uniqueIdJs = grunt.config.get('uniqueIdJs');
    uniqueIdCss = grunt.config.get('uniqueIdCss');

    return {
        options: {
            sourceMap: true
        },
        js: {
            src: jsFiles,
            dest: 'build/atlas.' + uniqueIdJs + '.js'
        },
        css: {
            src: cssFiles,
            dest: 'build/atlas.' + uniqueIdCss + '.css'
        }
    };
};