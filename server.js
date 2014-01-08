/**
 * Middlebury Menu App
 * Copyright (c) 2014 Dana Silver <dsilver@middlebury.edu>
 * MIT Licensed
 */

// New Relic for server analytics
require('newrelic');

// Module dependency
var express = require('express')
  , fs = require('fs');

// Configuration
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose');

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
}
connect();

// Mongoose error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect();
});

// Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) { require(models_path + '/' + file) }
});

// Bootstrap express
var app = express();
require('./config/express')(app, config);

// Bootsrap routes
require('./config/routes')(app);

// Start the app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('App started on port' + port);

// Expose app
exports = module.exports = app;