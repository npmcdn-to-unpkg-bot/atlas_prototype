module.exports = {
  dev: {
    options: {
      outputStyle: 'expanded'
    },
    files: {
      'modules/shared/style/shared.css': 'modules/shared/style/shared.scss'
    }
  },
  dist: {
    options: {
      outputStyle: 'compressed'
    },
    files: {
      'modules/shared/style/shared.css': 'modules/shared/style/shared.scss'
    }
  }
};