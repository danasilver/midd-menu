var path = require('path')
  , rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost/midd-menu',
    root: rootPath,
    app: {
      name: 'Middlebury Menu App'
    }
  },
  production: {
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    root: rootPath,
    app: {
      name: 'Middlebury Menu App'
    }
  }
}