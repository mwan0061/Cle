/*
 * routes.js - module to provide routing
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
  configRoutes, parseMongoObjectId,
  crud          = require( './crud' ),
  makeId        = crud.makeMongoId;
// ------------ END MODULE SCOPE VARIABLES -------------

// --------------- BEGIN UTILITY METHODS ---------------
parseMongoObjectId = function ( query ) {
  var
    searchExpr = /ObjectId\((.*)\)/,
    searchResult, key, objectId;

  for ( key in query ) {
    if ( typeof query[key] === 'string' ) {
      searchResult = searchExpr.exec( query[key] );
      if ( searchResult !== undefined ) {
        objectId = searchResult[1];
      }
      query[key] = makeId( objectId );
    }
    else {
      query[key] = parseMongoObjectId ( query[key] );
    }
  }

  return query;
};
// ---------------- END UTILITY METHODS ----------------

// --------------- BEGIN PUBLIC METHODS ----------------
configRoutes = function ( app, server ) {
  app.get( '/', function ( request, response ) {
    response.redirect( '/cle.html' );
  });

  app.all( '/api/:obj_type/*?', function ( request, response, next ) {
    response.contentType( 'json' );
    next();
  });

  app.get( '/api/:obj_type/list', function ( request, response ) {
    crud.read(
      request.params.obj_type,
      {},
      { limit : parseInt(request.query.limit),
        skip  : parseInt(request.query.skp),
        sort  : request.query.sort
      },
      function ( map_list ) {
        response.send( map_list );
      }
    );
  });

  app.post( '/api/:obj_type/list', function ( request, response ) {
    crud.read(
      request.params.obj_type,
      parseMongoObjectId( request.body ),
      { limit : parseInt(request.query.limit),
        skip  : parseInt(request.query.skp),
        sort  : request.query.sort
      },
      function ( map_list ) {
        response.send( map_list );
      }
    );
  });

  app.get( '/api/:obj_type/read/:id', function ( request, response) {
    crud.read(
      request.params.obj_type,
      { _id : makeId( request.params.id ) },
      {},
      function ( map_list ) { response.send( map_list ); }
    );
  });

  app.post( '/api/:obj_type/create', function ( request, response ) {
    crud.construct(
      request.params.obj_type,
      request.body,
      function ( result_map ) { response.send( result_map ); }
    );
  });

  app.post( '/api/:obj_type/update/:id', function ( request, response ) {
    crud.update(
      request.params.obj_type,
      { _id : makeId( request.params.id ) },
      request.body,
      function ( result_map ) { response.send( result_map ); }
    );
  });

  app.get( '/api/:obj_type/delete/:id', function ( request, response) {
    crud.destroy(
      request.params.obj_type,
      { _id : makeId( request.params.id ) },
      function ( result_map ) { response.send( result_map ); }
    );
  });
};

module.exports = { configRoutes : configRoutes };
// ---------------- END PUBLIC METHODS -----------------
