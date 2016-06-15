var modules = require('./config/modules'),
    concatConfig,
    jsFiles = ['build/temp/bower_components.js'],
    cssFiles = ['build/temp/bower_components.css'];

modules.forEach(function (module) {
    /**
     * JAVASCRIPT
     */

    //Add the main .module.js file first
    jsFiles.push('modules/' + module.slug + '/' + module.slug + '.module.js');

    //Then load the rest of the module, but don't include the .test.js files.
    jsFiles.push('modules/' + module.slug + '/**/*.js');
    jsFiles.push('!modules/' + module.slug + '/**/*.test.js');

    //And finally add the output of ngtemplates
    jsFiles.push('build/temp/' + module.slug + '.ngtemplates.js');



    /**
     * CSS
     */

    cssFiles.push('build/temp/' + module.slug + '.css');
});

concatConfig = {
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
