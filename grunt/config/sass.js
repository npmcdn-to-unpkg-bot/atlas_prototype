module.exports = {
  dev: {
    options: {
      outputStyle: 'expanded'
    },
    files: {
      '<%= app %>/shared/shared.css': '<%= app %>/shared/shared.scss'
    }
  },
  dist: {
    options: {
      outputStyle: 'compressed'
    },
    files: {
      '<%= build %>/style.css': 'modules/shared/style/shared.scss'
    }
  }
};