/*
 * accommodation.js - module to provide a list
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
  emitNewerAList, emitOlderAList,
  accommodationObj,
  socket = require( 'socket.io' ),
  crud   = require( './crud'    );
// ------------ END MODULE SCOPE VARIABLES -------------

// -------------- BEGIN UTILITY METHODS ----------------
// --------------- END UTILITY METHODS -----------------

// -------------- BEGIN PUBLIC METHODS -----------------
accommodationObj = {
  connect : function ( server ) {
    var io = socket.listen( server );

    io.of( '/accommodation' )
      .on( 'connection', function ( socket ) {});

    return io;
  }
};

module.exports = accommodationObj;
// --------------- END PUBLIC METHODS ------------------
