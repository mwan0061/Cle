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
cle.model = (function () {
  var
    initModule;

  initModule = function () {
    cle.model.accomodation.initModule();
  };

  return {
    initModule : initModule
  };
}());
