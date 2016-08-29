module.exports = function (grunt) {
    var buildId = grunt.config.get('buildId');

    return {
        options: {
            scriptTemplate: '<script src="{{path}}"></script>',
            linkTemplate: '<link rel="stylesheet" href="{{path}}">'
        },
        js: {
            options: {
                openTag: '<!-- SCRIPTS_START -->',
                closeTag: '<!-- SCRIPTS_END -->'
            },
            src: ['build/atlas.' + buildId + '.js'],
            dest: 'build/index.html'
        },
        css: {
            options: {
                openTag: '<!-- STYLESHEETS_START -->',
                closeTag: '<!-- STYLESHEETS_END -->'
            },
            src: ['build/atlas.' + buildId + '.css'],
            dest: 'build/index.html'
        }
    };
};