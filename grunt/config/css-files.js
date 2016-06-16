var modules = require('./modules'),
    cssFiles = ['build/temp/bower_components.css'];

modules.forEach(function (module) {
    cssFiles.push('build/temp/' + module.slug + '.css');
});

module.exports = cssFiles;