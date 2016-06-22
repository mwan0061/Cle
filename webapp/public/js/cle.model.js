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
cle.model = (function () {
  var
    initModule;

  initModule = function () {
    cle.model.accommodation.initModule();
  };

  return {
    initModule : initModule
  };
}());
