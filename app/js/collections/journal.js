/**********
 COLLECTION
***********/

// Create collection and link to firebase endpoint
var ClimbCollection = Backbone.Firebase.Collection.extend({
  model: ClimbEntry,
  url: "https://climb-journal.firebaseIO.com"
});
