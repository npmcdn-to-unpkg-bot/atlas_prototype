var modules = require('./config/modules'),
    sassConfig = {};

modules.forEach(function (module) {
    var filesConfig = {};

    filesConfig['build/temp/' + module.slug + '.css'] = [
        'modules/shared/styles/config/variables/**/*.scss',
        'modules/shared/styles/config/mixins/**/*.scss',
        'modules/' + module.slug + '/' + module.slug + '.scss'
    ];

    sassConfig[module.slug] = {
        files: filesConfig
    };
});

module.exports = sassConfig;