//if (Meteor.isServer) {
  // This code only runs on the server
  
  Meteor.publish('listings', function listingsPublication() {
    return Listings.find({ author: this.userId });
  });

//}