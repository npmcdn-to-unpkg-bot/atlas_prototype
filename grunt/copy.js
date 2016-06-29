var assetsFiles = require('./config/assets-files');

module.exports = {
    index: {
        src: ['index.html'],
        dest: 'build/index.html'
    },
    assets: {
        files: [
            {
                src: assetsFiles,
                dest: 'build/assets/',
                expand: true,
                flatten: true
            }
        ]
    }
};