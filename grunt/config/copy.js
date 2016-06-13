module.exports = {
  build: {
    src: ['index.html', '<%= app %>/**/*.js', '<%= app %>/**/*.html' ],
    dest: 'build',
    expand: true
  },
};