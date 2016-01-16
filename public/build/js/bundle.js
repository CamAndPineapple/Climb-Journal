/*******************
  UTILITY FUNCTIONS
********************/

// CURRENT DATE

var today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth() + 1,
    yyyy = today.getFullYear(),
    date = mm+'/'+dd+'/'+yyyy;





(function() {

  // Initial View
  $(".model-container").hide();

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

/*********
  MODEL
*********/
var ClimbEntry = Backbone.Model.extend({

  defaults: {
    Type: "Lead",
    Name: "Unknown",
    Grade: "5.12c",
    Date: date,
    Location: "Unknown"
  }
});

/**********
 COLLECTION
***********/

// Create collection and link to firebase endpoint
var ClimbCollection = Backbone.Firebase.Collection.extend({
  model: ClimbEntry,
  url: "https://climb-journal.firebaseIO.com"
});



var appRouter = Backbone.Router.extend({

  routes: {
    '' : 'newEntryPage',
    'entry' : 'newEntryPage',
    'journal' : 'journalPage'
  },

  newEntryPage: function () {
    $('.form-container').show();
    $('#model-container').hide();
    $('#journal-tab').removeClass('nav-link-active');
    $('#entry-tab').addClass('nav-link-active');
  },

  journalPage: function() {
    $('.form-container').hide();
    $('#model-container').show();
    $('#entry-tab').removeClass('nav-link-active');
    $('#journal-tab').addClass('nav-link-active');
  }
});

var newRouter = new appRouter();
Backbone.history.start();

/*********
 APP VIEW
*********/


var AppView = Backbone.View.extend({

  el: '#app',

  events: {
    'click #add': 'addNewClimb',
  },

  initialize: function() {
    this.collection = new ClimbCollection();
    this.render();
    this.listenTo(this.collection, 'add', this.renderClimb);
  },

  addNewClimb: function(e) {
    e.preventDefault();

    var formData = {};

    // For the button selected, add climbing type to formData
    $('.type-button-container').children().each(function(i, el) {
      if($(el).attr('id') === 'selected') {
        formData['Type'] = $(el).html();
      }
    });

    // Collect values from inputs and add to formData
    $('.form-input').children('input').each(function(i, el) {
      if ($(el).val() != '') {
        formData[el.id] = $(el).val();
      }
    });

    // Create collection using formData for each model
    this.collection.create(formData);
  },

  // Call renderClimb() on each item in collection
  render: function() {
    this.collection.each(function(item) {
      this.renderClimb(item);
    }, this);
  },

  // Render climb entry by creating a ClimbView
  // and appending the el it renders to #model-container
  renderClimb: function(item) {
    var climbView = new ClimbView({
      model: item
    });
    $('#model-container').append(climbView.render().el);
  },

});

// Launch application
function init() {
  // Store firebas data from collection
  var collection = new ClimbCollection();
  // Pass collection with data to AppView
  var app = new AppView({ collection: collection });
}
// When the document is ready, call the init function
$(function() {
  init();
});

/*********
CLIMB VIEW
*********/


var ClimbView = Backbone.View.extend({

  tagName: "div",
  className: "climbEntryContainer",
  template: _.template($('#climbEntryTemplate').html()),

  events: {
    'click .delete': 'deleteClimb'
  },

  deleteClimb: function() {

    var confirmDelete = confirm("are you sure you want to delete this climb?");

    if (confirmDelete) {
      // Destroy Model and remove view from page
      this.model.destroy();
      this.remove();
    }
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
