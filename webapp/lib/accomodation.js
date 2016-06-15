/*
 * accomodation.js - module to provide accomodation list
 */
 /*jslint         node   : true, continue : true,
  devel  : true, indent : 2,    maxerr   : 50,
  newcap : true, nomen  : true, plusplus : true,
  regexp : true, sloppy : true, vars     : false,
  white  : true
 */
 /*global */

// ----------- BEGIN MODULE SCOPE VARIABLES ------------
'use strict';
var
  emitNewerAccomodationList, emitOlderAccomodationList,
  accomodationObj,
  socket = require( 'socket.io' ),
  crud   = require( './crud'    ),

  makeMongoId = crud.makeMongoId,
  options_map = {
    limit : 5,
    sort  : "_id"
  };
// ------------ END MODULE SCOPE VARIABLES -------------

// -------------- BEGIN UTILITY METHODS ----------------
emitNewerAccomodationList = function( io, query_map ) {
  var find_map;

  if ( query_map !== undefined ) {
    if ( query_map.marker_id !== undefined ) {
      find_map = {
        "_id" : { $lt : makeMongoId( query_map.marker_id ) }
      }
    }

    if ( query_map.page_size !== undefined ) {
      options_map.limit = query_map.page_size;
    }
  }

  crud.read(
    'accomodation',
    find_map, options_map,
    function( result_list ) {
      io.of  ( '/accomodation' )
        .emit( 'updateNewerAccomodationList', result_list );
    }
  );
};

emitOlderAccomodationList = function( io, query_map ) {
  var find_map;

  if ( query_map !== undefined ) {
    if ( query_map.marker_id !== undefined ) {
      find_map = {
        "_id" : { $lt : makeMongoId( query_map.marker_id ) }
      }
    }

    if ( query_map.page_size !== undefined ) {
      options_map.limit = query_map.page_size;
    }
  }

  crud.read(
    'accomodation',
    find_map, options_map,
    function( result_list ) {
      io.of  ( '/accomodation' )
        .emit( 'updateOlderAccomodationList', result_list );
    }
  );
};
// --------------- END UTILITY METHODS -----------------

// -------------- BEGIN PUBLIC METHODS -----------------
accomodationObj = {
  connect : function ( server ) {
    var io = socket.listen( server );

    io.of( '/accomodation' )
      .on( 'connection', function ( socket ) {
        socket.on(
    		  'getNewerAccomodationlist',
    		  function ( query_map ) {
    		    emitNewerAccomodationList( io, query_map );
		      }
		    );

        socket.on(
		      'getOlderAccomodationList',
    		  function ( query_map ) {
    		    emitOlderAccomodationList( io, query_map );
    		  }
    		);
      }
    );

    return io;
  }
};

module.exports = accomodationObj;
// --------------- END PUBLIC METHODS ------------------
