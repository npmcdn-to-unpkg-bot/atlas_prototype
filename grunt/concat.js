var jsFiles = require('./config/js-files'),
    cssFiles = require('./config/css-files'),
    concatConfig;

concatConfig = {
    options: {
        sourceMap: true
    },
    js: {
        src: jsFiles,
        dest: 'build/atlas.js'
    },
    css: {
        src: cssFiles,
        dest: 'build/atlas.css'
    }
};

module.exports = concatConfig;
