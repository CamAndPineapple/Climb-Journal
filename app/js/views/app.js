
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

    $('.type-button-container').children().each(function(i, el) {
      if($(el).attr('id') === 'selected') {
        formData['Type'] = $(el).html();
      }
    });

    $('.form-input').children('input').each(function(i, el) {
      if ($(el).val() != '') {
        formData[el.id] = $(el).val();
      }
    });
    console.log(formData);
    this.collection.create(formData);
  },

  render: function() {
    this.collection.each(function(item) {
      this.renderClimb(item);
    }, this);
  },

  // render book by creating a BookView and appending
  // the element it renders to the libary's element
  renderClimb: function(item) {
    var climbView = new ClimbView({
      model: item
    });
    $('#model-container').append(climbView.render().el);
  },

});

// Create a function to kick off our BackboneFire app
function init() {
  // The data we are syncing from our remote Firebase database
  var collection = new ClimbCollection();
  var app = new AppView({ collection: collection });
}
// When the document is ready, call the init function
$(function() {
  init();
});
