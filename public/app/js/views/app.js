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
