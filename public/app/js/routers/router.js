var appRouter = Backbone.Router.extend({

  routes: {
    "" : "newEntryPage",
    "entry" : "newEntryPage",
    "journal" : "journalPage"
  },

  newEntryPage: function () {
    $(".form-container").show();
    $("#model-container").hide();
  },

  journalPage: function() {
    $(".form-container").hide();
    $("#model-container").show();
  }
});

var newRouter = new appRouter();
Backbone.history.start();
