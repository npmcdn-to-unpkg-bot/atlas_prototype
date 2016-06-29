module.exports = {
    index: {
        src: ['index.html'],
        dest: 'build/index.html'
    },
    assets: {
        files: [
            {
                src: ['modules/*/assets/*.png'],
                dest: 'build/assets/',
                expand: true,
                flatten: true
            }
        ]
    }
};