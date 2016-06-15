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
  crud   = require( './crud'    );
// ------------ END MODULE SCOPE VARIABLES -------------

// -------------- BEGIN UTILITY METHODS ----------------
// --------------- END UTILITY METHODS -----------------

// -------------- BEGIN PUBLIC METHODS -----------------
accomodationObj = {
  connect : function ( server ) {
    var io = socket.listen( server );

    io.of( '/accomodation' )
      .on( 'connection', function ( socket ) {});

    return io;
  }
};

module.exports = accomodationObj;
// --------------- END PUBLIC METHODS ------------------
