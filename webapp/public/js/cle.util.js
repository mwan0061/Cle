/*
 * cle.util.js
 * General JavaScript utilities
 *
*/

/*jslint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true
*/
/*global $, cle */

cle.util = (function () {
  $.postJSON = function(url, data, success, error, args) {
    args = $.extend({
      url        : url,
      type       : 'POST',
      data       : JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType   : 'json',
      async      : true,
      success    : success,
      error      : error
    }, args);
    return $.ajax(args);
  };

  return {};
}());
