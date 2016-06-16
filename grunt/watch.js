module.exports = {
    options: {
        livereload: true
    },
    js: {
        files: [
            'modules/**/*.js',
            'modules/**/*.html'
        ],
        tasks: [
            'test-js',
            'build-js'
        ]
    },
    css: {
        files: [
            'modules/**/*.scss'
        ],
        tasks: [
            'test-css',
            'build-css'
        ]
    }

};