module.exports = {
  connect: {
    options: {
      port: 8000,
      open: true,
      livereload: 357230,
      hostname: 'localhost' // Change this to '0.0.0.0' to access the server from outside
    },
    livereload: {
      options: {
        middleware: function(connect) {
          return [
            connect.static('.tmp'),
            connect().use('/bower_components', connect.static('./bower_components')),
            connect.static('<%= app %>')
          ];
        }
      }
    },
    test: {
      options: {
        open: true,
        port: 9001,
        middleware: function(connect) {
          return [
            connect.static('.tmp'),
            connect.static('test'),
            connect().use('/bower_components', connect.static('./bower_components')),
            connect.static('<%= app %>')
          ];
        }
      }
    },
    dist: {
      options: {
        base: '<%= dist %>',
        livereload: false
      }
    }
  }
};