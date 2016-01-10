/*********
CLIMB VIEW
*********/


var ClimbView = Backbone.View.extend({

  tagName:  "div",
  className: "climbContainer",
  template: _.template( $('#climbTemplate').html() ),


  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
