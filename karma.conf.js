// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/leaflet/dist/leaflet.js',
            'bower_components/redux/index.js',

            'modules/shared/shared.module.js',

            'modules/header/header.module.js',
            'modules/detail/detail.module.js',
            'modules/layer-selection/layer-selection.module.js',
            'modules/map/map.module.js',
            'modules/page/page.module.js',
            'modules/search-results/search-results.module.js',
            'modules/straatbeeld/straatbeeld.module.js',

            'modules/atlas/atlas.module.js',

            'modules/**/*.js',

            'templates.js'
        ],

        plugins: [
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-coverage',
            'karma-phantomjs-launcher'
        ],

        // level of logging
        // possible values: OFF, ERROR, WARN, INFO, DEBUG
        logLevel: 'ERROR',

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Reporters
        // - dots
        // - progress
        // - junit
        // - growl
        // - coverage
        reporters: ['coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'modules/**/!(*.test).js': ['coverage']
        },

        // optionally, configure the reporter
        // type can also be 'cobertura' which should be understand by Jenkins
        coverageReporter: {
            type: 'html',
            dir: 'reports/coverage/',
            check: {
                global: {
                    statements: 95,
                    branches: 95,
                    functions: 95,
                    lines: 95
                }
            },
            watermarks: {
                statements: [95, 100],
                functions: [95, 100],
                branches: [95, 100],
                lines: [95, 100]
            }
        },

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
