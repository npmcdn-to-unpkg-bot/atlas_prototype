module.exports = {
    app: {
        cwd: '<%= app %>/..',
        src: 'modules/**/*.html',
        dest: 'templates.js',
        options: {
            module: 'atlas',
            htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true }
        }
    }
};