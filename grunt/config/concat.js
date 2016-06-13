module.exports = {
  options: {
    separator: ';',
  },
  vendorJS: {
    src: ['./bower_components/{,*/}*.js', '!./bower_components/{,*/}*min.js'],
    dest: 'build/js/vendor.js'
  },
  vendorCSS: {
    src: ['./bower_components/{,*/}*.css'],
    dest: 'build/vendor.css'
  },
  customJS: {
    src: ['source/js/{,*/}*.js' ],
    dest: 'build/js/main.js',
  },
};