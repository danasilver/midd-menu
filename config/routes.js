var menus = require('../app/controllers/menus')
  , api = require('../app/controllers/api')
  , about = require('../app/controllers/about');

module.exports = function (app) {
  app.get('/', menus.index);
  app.get('/:date', menus.date);

  // app.get('/api', api.help);
  app.get('/api/today', api.today);
  app.get('/api/:date', api.date);

  // app.get('/about', about.index);
  // app.get('/about/opensource', about.opensource);
}

