/* jshint -W075 */
/* Tolerate duplicate keys */

var request = require('request')
  , scraper = require('./scraper')
  , moment = require('moment');

/**
 * Convert UTC date object to string in EST
 * @param date : Date object in TZ UTC
 * 
 * Returns date string
 */
exports.getDates = function (dateObj) {
  var date
    , retDates = {};

  // If on the server (UTC)
  if (dateObj.getTimezoneOffset() === 0) {
    date = moment(dateObj).zone(300);
  }
  else {
    date = moment(dateObj);
  }

  retDates['dateString'] = date.format("YYYY-MM-DD");
  retDates['displayDate'] = date.format("MMMM D");

  return retDates;
}

/**
 * Scrape menu from any date
 * @param date : EST date in yyyy-mm-dd format
 * 
 * Returns menu as json
 */
exports.getAnyDateMenu = function (date, displayDate, req, res) {
  var payload = {
    'field_day_value[value][date]': date,
    'view_name': 'menus_test',
    'view_display_id': 'page',
    'view_args': '',
    'view_path': 'dining',
    'view_base_path': 'dining',
    'view_dom_id': '56a3964e9d683783129d622f9a79b171',
    'pager_element': '0',
    'ajax_html_ids[]': 'skip-link',
    'ajax_html_ids[]': 'midd_search_query',
    'ajax_html_ids[]': 'midd_search_submit',
    'ajax_html_ids[]': 'midd_ajax_search_url',
    'ajax_html_ids[]': 'midd_wordmark',
    'ajax_html_ids[]': 'midd_navigation',
    'ajax_html_ids[]': 'midd_content',
    'ajax_html_ids[]': 'navigation',
    'ajax_html_ids[]': 'nav_dining',
    'ajax_html_ids[]': 'nav_retail',
    'ajax_html_ids[]': 'nav_comment',
    'ajax_html_ids[]': 'views-exposed-form-menus-test-page',
    'ajax_html_ids[]': 'edit-field-day-value-wrapper',
    'ajax_html_ids[]': 'edit-field-day-value-value-wrapper',
    'ajax_html_ids[]': 'edit-field-day-value-value',
    'ajax_html_ids[]': 'edit-field-day-value-value',
    'ajax_html_ids[]': 'edit-field-day-value-value-datepicker-popup-0',
    'ajax_html_ids[]': 'edit-submit-menus-test',
    'ajax_html_ids[]': 'midd_footer',
    'ajax_html_ids[]': 'midd_footer_panel',
    'ajax_html_ids[]': 'ui-datepicker-div',
    'ajax_page_state[theme]': 'middsatellite',
    'ajax_page_state[theme_token]': '-sLphxibd9eikzNUq_vyU5IvCdJNRFnzwSkydIx0hYI',
    'ajax_page_state[css][modules/system/system.base.css]': '1',
    'ajax_page_state[css][modules/system/system.menus.css]': '1',
    'ajax_page_state[css][modules/system/system.messages.css]': '1',
    'ajax_page_state[css][modules/system/system.theme.css]': '1',
    'ajax_page_state[css][misc/ui/jquery.ui.core.css]': '1',
    'ajax_page_state[css][misc/ui/jquery.ui.theme.css]': '1',
    'ajax_page_state[css][misc/ui/jquery.ui.datepicker.css]': '1',
    'ajax_page_state[css][sites/all/modules/date/date_popup/themes/jquery.timeentry.css]': '1',
    'ajax_page_state[css][modules/comment/comment.css]': '1',
    'ajax_page_state[css][sites/all/modules/date/date_api/date.css]': '1',
    'ajax_page_state[css][sites/all/modules/date/date_popup/themes/datepicker.1.7.css]': '1',
    'ajax_page_state[css][modules/field/theme/field.css]': '1',
    'ajax_page_state[css][modules/node/node.css]': '1',
    'ajax_page_state[css][modules/search/search.css]': '1',
    'ajax_page_state[css][modules/user/user.css]': '1',
    'ajax_page_state[css][sites/all/modules/views/css/views.css]': '1',
    'ajax_page_state[css][sites/all/modules/ctools/css/ctools.css]': '1',
    'ajax_page_state[css][sites/all/themes/middsatellite/system.menus.css]': '1',
    'ajax_page_state[css][sites/all/themes/middsatellite/system.messages.css]': '1',
    'ajax_page_state[css][sites/all/themes/middsatellite/system.theme.css]': '1',
    'ajax_page_state[css][sites/all/themes/middsatellite/css/styles.css]': '1',
    'ajax_page_state[css][sites/all/themes/middsatellite/css/meal-menus.css]': '1',
    'ajax_page_state[js][misc/jquery.js]': '1',
    'ajax_page_state[js][misc/jquery.once.js]': '1',
    'ajax_page_state[js][misc/drupal.js]': '1',
    'ajax_page_state[js][misc/ui/jquery.ui.core.min.js]': '1',
    'ajax_page_state[js][misc/jquery.cookie.js]': '1',
    'ajax_page_state[js][misc/jquery.form.js]': '1',
    'ajax_page_state[js][misc/ui/jquery.ui.datepicker.min.js]': '1',
    'ajax_page_state[js][sites/all/modules/date/date_popup/jquery.timeentry.pack.js]': '1',
    'ajax_page_state[js][misc/ajax.js]': '1',
    'ajax_page_state[js][sites/all/modules/date/date_popup/date_popup.js]': '1',
    'ajax_page_state[js][sites/all/modules/views/js/base.js]': '1',
    'ajax_page_state[js][misc/progress.js]': '1',
    'ajax_page_state[js][sites/all/modules/views/js/ajax_view.js]': '1'
  }
  request({
    method: 'POST',
    url: 'http://menus.middlebury.edu/views/ajax',
    form: payload,
    json: true
  }, function(err, r_res, body) {
    if (!err && r_res.statusCode === 200) {
      var menu = scraper.parseMenu(date, body[2].data);

      res.render('menus/menu', { menu: menu, displayDate: displayDate });
    }
  });
}