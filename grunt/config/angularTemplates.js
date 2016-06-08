module.exports = {
  ngtemplates:{
    app: {
      cwd: '<%= app %>',
      src: '**/*.html',
      dest:  'templates.js',
      options: {
        module: 'atlas',
        htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true }
      }
    }
  }
};