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
	    db : TAFFY()
    },

    accomodationProto, makeAccomodationObj,
  	connect, getNextPage, getDB, clearDB,
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
  accomodationProto = {};

  makeAccomodationObj = function ( accomodation_map ) {
    var
      accm,
      id          = accomodation_map._id,
      url         = accomodation_map.url,
      images      = accomodation_map.images,
      description = accomodation_map.description;

	  accm             = Object.create( accomodationProto );
    accm.id          = id;
    accm.url         = url;
    accm.images      = images;
    accm.description = description;

    stateMap.db.insert( accm );
    return accm;
  };

  connect = function () { var sio = cle.data.getSio( '/accomodation' ); };

	getNextPage = function ( id ) {
    var id = typeof id === 'undefined' ? '000000000000000000000000' : id;

	  $.postJSON( '/api/accomodation/list/?limit=5&skip=0&sort=_id',
      { "_id" : { "$gt" : "ObjectId(" + id + ")" } },
      function( data ) {
        $.gevent.publish( 'cle-new-accomodation-page-received',
                          data.map( makeAccomodationObj ) );
  		},
      function( jqXHR, textStatus, errorThrown ) { console.log(errorThrown); }
    );
	};

  getDB = function () { return stateMap.db; };

  clearDB = function () { stateMap.db = TAFFY(); };

  initModule = function () {};

  return {
    initModule	: initModule,
    connect     : connect,
    getNextPage : getNextPage,
    getDB       : getDB,
    clearDB     : clearDB
  };
}());
