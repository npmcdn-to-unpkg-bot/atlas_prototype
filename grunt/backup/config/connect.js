module.exports = {
  connect: {
    options: {
      //base: '<%= app %>',
      port: 8000,
      open: true,
      livereload: 357230,
      hostname: 'localhost' // Change this to '0.0.0.0' to access the server from outside
    },
  },
  // livereload: {
  //   options: {
  //     middleware: function(connect) {
  //       return [
  //         connect().use('/bower_components', connect.static('./bower_components')),
  //         connect.static('<%= build %>')
  //       ];
  //     }
  //   }
  // },
};