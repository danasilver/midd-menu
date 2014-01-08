var express = require('express')
  , pkg = require('../package.json')
  , helpers = require('view-helpers')
  , env = process.env.NODE_ENV || 'development';

module.exports = function (app, config) {
  app.set('showStackError', true);

  app.use(express.compress({
    filter: function(req, res) {
      return /json|text/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  app.use(express.static(config.root + '/static'));

  if (env !== 'test') { app.use(express.logger('dev')); }

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.configure(function () {
    app.use(function (req, res, next) {
      res.locals.pkg = pkg;
      next();
    });
    app.use(express.cookieParser());
    app.use(express.json());
    app.use(express.urlencoded());

    app.use(helpers(pkg.name));

    app.use(app.router);

    app.use(function (err, req, res, next) {
      if (err.message &&
        (~err.message.indexOf('not found') || 
          (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next();
      }

      console.error(err.stack);

      res.status(500).render('500', {error: err.stack} );
    });

    app.use(function (req, res, next) {
      res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
      });
    });
  });

  app.configure('development', function () {
    app.locals.pretty = true;
  });
}