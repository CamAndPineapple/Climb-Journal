/**********
 COLLECTION
***********/

// Create collection and link to firebase endpoint
var ClimbCollection = Backbone.Firebase.Collection.extend({
  model: Climb,
  url: "https://climb-journal.firebaseIO.com"
});
