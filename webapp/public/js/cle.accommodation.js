/*
 * cle.accommodation_list.js
 * Accommodation List module for SPA
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, cle */
cle.accommodation = (function () {
  'use strict';

  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
        + '<div class="cle-accommodation-list">'
          + '<div class="cle-accommodation-list-head">'
            + '<div class="cle-accommodation-list-title">'
              + 'Accommodation List'
            + '</div>'
          + '</div>'
          + '<div class="cle-accommodation-list-box">'
          + '</div>'
        + '</div>',

      settable_map : {
        $append_target      : true,
        accommodation_model : true
      },

      accommodation_model : null
    },

    stateMap  = {
      $append_target   : null,
      position_type    : 'closed',
      px_per_em        : 0,
      slider_hidden_px : 0,
      slider_closed_px : 0,
      slider_opened_px : 0
    },

  	jqueryMap = {},

  	setJqueryMap,
  	configModule, initModule,
    onSwipeList,
    onReceiveNextPage;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var
      $append_target = stateMap.$append_target,
      $slider        = $append_target.find( '.cle-accommodation-list' );

    jqueryMap = {
      $slider   : $slider,
      $list_box : $slider.find( '.cle-accommodation-list-box' ),
      $window   : $(window)
    };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  onSwipeList = function ( event, direction, distance, duration,
                           fingerCount, fingerData ) {
    if ( direction === 'up' ) { configMap.accommodation_model.getNextPage(); }
  };

  onReceiveNextPage = function ( event ) {
    console.log( event );
  };
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /configModule/
  // Example   : cle.accommodation.configModule({ slider_open_em : 18 });
  // Purpose   : Configure the module prior to initialization
  // Arguments :
  //   * set_chat_anchor - a callback to modify the URI anchor to
  //     indicate opened or closed state. This callback must return
  //     false if the requested state cannot be met
  //   * chat_model - the chat model object provides methods
  //       to interact with our instant messaging
  //   * people_model - the people model object which provides
  //       methods to manage the list of people the model maintains
  //   * slider_* settings. All these are optional scalars.
  //       See mapConfig.settable_map for a full list
  //       Example: slider_open_em is the open height in em's
  // Action    :
  //   The internal configuration data structure (configMap) is
  //   updated with provided arguments. No other actions are taken.
  // Returns   : true
  // Throws    : JavaScript error object and stack trace on
  //             unacceptable or missing arguments
  //
  configModule = function ( input_map ) {
    cle.util.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  // End public method /configModule/

  // Begin public method /initModule/
  // Example    : spa.chat.initModule( $('#div_id') );
  // Purpose    :
  //   Directs Chat to offer its capability to the user
  // Arguments  :
  //   * $append_target (example: $('#div_id')).
  //     A jQuery collection that should represent
  //     a single DOM container
  // Action     :
  //   Appends the chat slider to the provided container and fills
  //   it with HTML content.  It then initializes elements,
  //   events, and handlers to provide the user with a chat-room
  //   interface
  // Returns    : true on success, false on failure
  // Throws     : none
  //
  initModule = function ( $append_target ) {
    var $list_box;

    // load accommodation list slider html and jquery cache
    stateMap.$append_target = $append_target;
    $append_target.append( configMap.main_html );
    setJqueryMap();

    // Have $list_box subscribe to jQuery global events
    $list_box = jqueryMap.$list_box;
    $.gevent.subscribe( $list_box, 'cle-next-page-received', onReceiveNextPage );

    // bind user input events
    jqueryMap.$list_box.swipe({ swipe : onSwipeList, threshold : 0 });
  };
  // End public method /initModule/

  // return public methods
  return {
    configModule      : configModule,
    initModule        : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
