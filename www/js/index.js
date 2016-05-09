(function($){
  'use strict';

    /*global window: false */
    /*global console: false */

    function setupClickHandler(){
      $('#navContainer').load('nav.html');

      $('#test').click(function () {
         $.ajax({
            type: "GET",
            url: '/api/user',
            success: function (jsonData) {
              console.dir(jsonData);
            }
         });
      });
    }

    //on document ready
    window.jQuery().ready(function () {
        //setup click handler
        setupClickHandler();
    });

})(window.jQuery);