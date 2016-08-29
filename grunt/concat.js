var jsFiles = require('./config/js-files'),
    cssFiles = require('./config/css-files'),
    buildId = require('./config/build-id'),
    concatConfig;

concatConfig = {
    options: {
        sourceMap: true
    },
    js: {
        src: jsFiles,
        dest: 'build/atlas.' + buildId + '.js'
    },
    css: {
        src: cssFiles,
        dest: 'build/atlas.' + buildId + '.css'
    }
};

module.exports = concatConfig;
