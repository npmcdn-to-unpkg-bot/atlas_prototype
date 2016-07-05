var assetsFiles = require('./config/assets-files');

module.exports = {
    js: {
        files: [
            'modules/**/*.js',
            'modules/**/*.html'
        ],
        tasks: [
            'build-js',
            'test-js'
        ]
    },
    css: {
        files: [
            'modules/**/*.scss'
        ],
        tasks: [
            'build-css',
            'test-css'
        ]
    },
    static: {
        files: [
            'index.html'
        ],
        tasks: [
            'build'
        ]
    },
    assets: {
        files: assetsFiles,
        tasks: ['copy:assets']
    },
    livereload: {
        options: {
            livereload: true
        },
        files: [
            'build/**/*',
            '!build/temp/**/*'
        ]
    }

};