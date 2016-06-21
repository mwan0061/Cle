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
  configRoutes, parseMongoObjectId, parseQueryStr,
  crud          = require( './crud' ),
  makeId        = crud.makeMongoId;
// ------------ END MODULE SCOPE VARIABLES -------------

// --------------- BEGIN UTILITY METHODS ---------------
parseMongoObjectId = function ( query ) {
  var
    searchExpr = /^ObjectId\(([A-Fa-f0-9]{24})\)$/,
    key, val, test;

  for ( key in query ) {
    val = query[key];
    test = typeof val === 'string' ? val.match( searchExpr ) : null;
    if ( test ) { query[key] = makeId( test[1] ); }
    else { query[key] = parseMongoObjectId ( query[key] ); }
  }

  return query;
};

parseQueryStr = function ( req_query ) {
  return {
    limit : parseInt(req_query.limit),
    skip  : parseInt(req_query.skp),
    sort  : req_query.sort
  };
}
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
      parseQueryStr( request.query ),
      function ( map_list ) { response.send( map_list ); }
    );
  });

  app.post( '/api/:obj_type/list', function ( request, response ) {
    crud.read(
      request.params.obj_type,
      parseMongoObjectId( request.body ),
      parseQueryStr( request.query ),
      function ( map_list ) { response.send( map_list ); }
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
