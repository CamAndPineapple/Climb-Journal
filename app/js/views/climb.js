/*********
CLIMB VIEW
*********/


var ClimbView = Backbone.View.extend({

  tagName:  "div",
  className: "climbContainer",
  template: _.template( $('#climbTemplate').html() ),

  events: {
      'click .delete': 'deleteClimb'
  },

  deleteClimb: function() {
    // Destroy model and remove view from page
    this.model.destroy
    this.remove();

  },


  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
