module.exports = {
  dev: {
    options: {
      sourceMap: true,
      presets: ['es2015']
    },
    files: [{
      expand: true,
      src: ['**/*.es6'],
      ext: '-compiled.js'
    }]
  }
};