module.exports = {
    js: {
        files: [
            'modules/**/*.js',
            'modules/**/*.html'
        ],
        tasks: [
            'build-js'
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