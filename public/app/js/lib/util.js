/*******************
  UTILITY FUNCTIONS
********************/

// CURRENT DATE

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

var date = mm+'/'+dd+'/'+yyyy;

$(".model-container").hide();

(function() {

  $('#about').hide();

  // GOOGLE PLACES AUTOCOMPLETE API

  function initialize() {

    var input = document.getElementById('Location');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  // TYPE BUTTON SELECTOR

  $('.type-button').click(function(e) {
    e.preventDefault();
    $(this).siblings().removeAttr('id');
    $(this).attr('id', 'selected');

  });

}());
