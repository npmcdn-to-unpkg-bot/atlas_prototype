// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
  config.set({
    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/leaflet/leaflet.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'modules/**/*.module.js',
      'modules/**/*.js',
    ],

    plugins: [
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-phantomjs-launcher',
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
      'modules/**/*.js': ['coverage'],
      '!**/*.test.js': ['coverage'],
    },

    // optionally, configure the reporter
    // type can also be 'cobertura' which should be understand by Jenkins
    coverageReporter: {
      type: 'html',
      dir: 'reports/coverage/'
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
