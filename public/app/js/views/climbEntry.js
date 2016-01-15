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
