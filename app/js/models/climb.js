/*********
  MODEL
*********/

var Climb = Backbone.Model.extend({
  defaults: {
    Type: "Lead",
    Name: "Route Name",
    Grade: "5.10",
    Date: new Date().getFullYear(),
    Location: "Unknown"
  }
});
