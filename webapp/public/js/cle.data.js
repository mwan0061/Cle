/*
 * cle.data.js
 * Data module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, io, cle */

cle.data = (function () {
  'use strict';
  var
    stateMap = { sio : null },
    makeSio, getSio, initModule;

  makeSio = function ( name_space ) {
    var socket = io.connect( name_space );

    return {
      emit : function ( event_name, data ) {
        socket.emit( event_name, data );
      },
      on   : function ( event_name, callback ) {
        socket.on( event_name, function (){
          callback( arguments );
        });
      }
    };
  };

  getSio = function ( namespace ){
    if ( ! stateMap.sio ) { stateMap.sio = makeSio( namespace ); }
    return stateMap.sio;
  };

  initModule = function (){};

  return {
    getSio     : getSio,
    initModule : initModule
  };
}());
