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
    /*
    es : {

    },
    */
    css: {
        files: [
            'modules/**/*.scss'
        ],
        tasks: [
            'test-css',
            'build-css'
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