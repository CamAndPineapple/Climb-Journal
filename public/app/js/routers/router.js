/*********
  ROUTER 
*********/

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
