/*
 * cle.model.js
 * Model module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global TAFFY, $, cle */
// $.gevent.publish( 'spa-login', [ stateMap.user ] );
// stateMap.people_db      = TAFFY();
// stateMap.people_db.insert( user );
// stateMap.people_db({ cid : person.cid }).remove();
cle.model.accomodation = (function () {
  'use strict';
  var
    configMap = {},
    stateMap  = {
	  _db : TAFFY()
    },

    accomodationProto, makeAccomodation,
	accomodation,
	initModule;

  // The accomodation object API
  // ---------------------
  // The accomodation object is available at cle.model.accomodation.
  // The people object provides methods and events to manage
  // a collection of accomodation objects. Its public methods include:
  //   *
  //   *
  //
  // jQuery global custom events published by the object include:
  //   * 
  //
  // Each accomodation is represented by an accomodation object.
  // Accomodation objects provide the following methods:
  //   * 
  //
  // The attributes for a person object include:
  //   * 
  //   * css_map - a map of attributes used for ...
  //     presentation.
  //
  accomodationProto = {
  };

  makeByProto = function ( accomodation_map ) {
    var accm;
	accm = Object.create( accomodationProto );
    stateMap._db.insert( accm );
    return accm;
  };

  accomodation = (function () {
    var ;

    connect = function () {
      var sio = cle.data.getSio( '/accomodation' );
    };
	
	getNextPage = function () {
	  $.getJSON( '/api/:obj_type/read/:id', function( data ) {
		  var items = [];

		  $.each( data, function( key, val ) {
			
		  });
		});
	}

    return {
    };
  }());

  initModule = function () {
  };

  return {
    initModule	 : initModule,
    accomodation : accomodation
  };
}());
