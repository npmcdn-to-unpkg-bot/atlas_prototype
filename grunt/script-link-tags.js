module.exports = {
    js: {
        options: {
            scriptTemplate: '<script src="{{path}}"></script>',
            openTag: '<!-- SCRIPTS_START -->',
            closeTag: '<!-- SCRIPTS_END -->'
        },
        src: ['build/atlas.js'],
        dest: 'build/index.html'
    },
    css: {
        options: {
            linkTemplate: '<link rel="stylesheet" href="{{path}}">',
            openTag: '<!-- STYLESHEETS_START -->',
            closeTag: '<!-- STYLESHEETS_END -->'
        },
        src: ['build/atlas.css'],
        dest: 'build/index.html'
    }
};