/*
 * nodeunit_suite.js
 * Unit test suite
 *
 * Please run using /nodeunit <this_file>/
*/
/*jslint          node    : true, continue  : true,
  devel   : true, indent  : 2,    maxerr    : 50,
  newcap  : true, nomen   : true, plusplus  : true,
  regexp  : true, sloppy  : true, vars      : false,
  white   : true
*/
/*global $, cle */
// third-party modules and globals
var
  jsdomMod = require("jsdom");
  jsdom    = jsdomMod.jsdom,
  document = jsdom("<html><head></head><body>hello world</body></html>"),
  window   = document.defaultView;
jsdomMod.changeURL(window, "http://localhost:3000");

global.jQuery   = require( 'jquery' );
global.$        = global.jQuery;

global.$.support.cors = true;
global.XMLHttpRequest = window.XMLHttpRequest;

global.TAFFY = require( '../public/js/jq/taffydb-2.6.2.js' ).taffy;
require( '../public/js/jq/jquery.event.gevent-0.1.9.js' );

// project modules and globals
global.cle = null;
require( '../public/js/cle.js' );
require( '../public/js/cle.util.js' );
require( '../public/js/cle.data.js' );
require( '../public/js/cle.model.js' );
require( '../public/js/cle.model.accommodation.js' );

var testGetAPage = function ( test ) {
  var
    db, $t,
    $defer = $.Deferred(),
    on_new_page;

  test.expect( 1 );

  on_new_page = function ( event ) {
    db = cle.model.accommodation.getDB();
    test.ok( db().count() == arguments.length - 1,
            'get a page' );
    cle.model.accommodation.clearDB();
    $defer.resolve();
  };
  $defer.done( test.done );

  $t = $('<div/>');
  $.gevent.subscribe( $t, 'cle-new-a-page-received', on_new_page );
  cle.initModule();
  cle.model.accommodation.getNextPage();
}

module.exports = { testGetAPage : testGetAPage };
