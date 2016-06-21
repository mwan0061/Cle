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
cle.model.accommodation = (function () {
  'use strict';
  var
    configMap = {},
    stateMap  = {
	    db : TAFFY()
    },

    accommodationProto, makeAccommodationObj,
  	connect, getNextPage, getDB, clearDB,
  	initModule;

  // The accommodation object API
  // ---------------------
  // The accommodation object is available at cle.model.a.
  // The people object provides methods and events to manage
  // a collection of accommodation objects. Its public methods include:
  //   *
  //   *
  //
  // jQuery global custom events published by the object include:
  //   *
  //
  // Each a is represented by an a object.
  // A objects provide the following methods:
  //   *
  //
  // The attributes for a accommodation object include:
  //   *
  //   * css_map - a map of attributes used for ...
  //     presentation.
  //
  accommodationProto = {};

  makeAccommodationObj = function ( accommodation_map ) {
    var
      accommodation,
      id          = accommodation_map._id,
      url         = accommodation_map.url,
      images      = accommodation_map.images,
      description = accommodation_map.description;

	  accommodation             = Object.create( accommodationProto );
    accommodation.id          = id;
    accommodation.url         = url;
    accommodation.images      = images;
    accommodation.description = description;

    stateMap.db.insert( accommodation );
    return accommodation;
  };

  connect = function () { var sio = cle.data.getSio( '/a' ); };

	getNextPage = function ( id ) {
    var
      id = typeof id === 'undefined' ? '000000000000000000000000' : id,
      url = '/api/accommodation/list/?limit=5&skip=0&sort=_id',
      query = { "_id" : { "$gt" : "ObjectId(" + id + ")" } },
      event_name = 'cle-new-a-page-received',

      success = function( data ) {
        data = data.map( makeAccommodationObj );
        $.gevent.publish( event_name, data );
  		},

      error = function( jqXHR, textStatus, errorThrown ) {
        console.log(errorThrown);
      };

	  $.postJSON( url, query, success, error );
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
