var modules = require('./config/modules'),
    concatConfig,
    jsFiles = ['build/temp/bower_components.js'],
    cssFiles = ['build/temp/bower_components.css'];

modules.forEach(function (module) {
    jsFiles.push('build/temp/' + module.slug + '.ngtemplates.js');
});

concatConfig = {
    options: {
        separator: ';'
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
