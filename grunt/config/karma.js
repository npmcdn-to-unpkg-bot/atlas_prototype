module.exports = {
  options: {
    configFile: 'karma.conf.js'
  },
  jenkins: {
    reporters: ['mocha'],
    logLevel: 'LOG_DEBUG'
  },
  all: {
    reporters: ['mocha']
  },
  coverage: {
    reporters: ['mocha', 'coverage']
  }
};