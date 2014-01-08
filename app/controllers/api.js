var mongoose = require('mongoose')
  , Menu = mongoose.model('Menu')
  , request = require('request')
  , utils = require('../../lib/utils')
  , scraper = require('../../lib/scraper');

var request = require('request'),
  scraper = require('../../lib/scraper'),
  utils = require('../../lib/utils');

exports.today = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  Menu.findOne({date: utils.getDateEST(new Date())}, {'_id': 0, '__v': 0}, function(err, result) {
    if (result != null) {
      res.send(result);
    }
    else {
      // Err, menu not in database for today
      utils.getAnyDateMenu(utils.getDateEST(new Date()), req, res);
    }
  });
}

exports.date = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
  var requestDate = req.params.date;

  if (/^\d{4}-\d{2}-\d{2}$/.test(requestDate)) {
    var isFuture = (new Date() < new Date(requestDate.replace(/-/g, '/') + ' EST'));

    if (!isFuture) {
      Menu.findOne({date: req.params.date}, {'_id': 0, '__v': 0}, function(err, result) {
        if (result != null) {
          res.send(result);
        }
        else {
          // Menu not in database
          utils.getAnyDateMenu(requestDate, req, res);
        }
      });
    }
    else {
      // Future date
      res.send(utils.getAnyDateMenu(requestDate));
    }
  }
  else {
    res.send(404, 'Menu not found for ' + requestDate + '.\n' + 'Proper format is `/yyyy-mm-dd`.');
  }
  
}
