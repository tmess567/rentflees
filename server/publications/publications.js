//if (Meteor.isServer) {
  // This code only runs on the server
  
  Meteor.publish('listings', function listingsPublication() {
    return Listings.find();
  });

//}
/*
Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    role: 'owner',
  }});
});
*/