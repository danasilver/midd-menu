var mongoose = require('mongoose')
  , Menu = mongoose.model('Menu')
  , utils = require('../../lib/utils');

exports.index = function (req, res) {
  var dates = utils.getDates(new Date())

  Menu.findOne({ date: dates.dateString }, {'_id': 0, '__v': 0}, function (err, result) {
    if (result !== null) {
      res.render('menus/menu', { menu: result, displayDate: dates.displayDate });
    }
    else {
      utils.getAnyDateMenu(dates.dateString, dates.displayDate, req, res);
    }
  })
}

exports.date = function (req, res) {

}