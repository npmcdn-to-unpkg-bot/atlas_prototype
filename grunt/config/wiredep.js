module.exports = {
  dev: {
    devDependencies: true,
    src: ['index.html'],
  },
  prod: {
    devdependencies: false,
    src: ['build/index.html']
  }
};