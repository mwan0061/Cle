/*
 * lib_accomodation.js
 * Unit test suite for lib/accomodation.js
 *
 * Please run using /nodeunit <this_file>/
*/
/*jslint          node    : true, continue  : true,
  devel   : true, indent  : 2,    maxerr    : 50,
  newcap  : true, nomen   : true, plusplus  : true,
  regexp  : true, sloppy  : true, vars      : false,
  white   : true
*/
/*global $, cle*/
// third-party modules and globals
global.jQuery = require( 'jquery' );
global.TAFFY  = require( '../public/js/jq/jquery.event.gevent-0.1.9.js' );
// project modules and globals
global.cle = null;
require( '../lib/accomodation.js' );
