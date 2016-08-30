//if (Meteor.isServer) {
  // This code only runs on the server
  
  Meteor.publish('listings', function listingsPublication() {
    Listings.allow({
	  insert: function () { return true; },
	  update: function () { return true; },
	  remove: function () { return true; }
	});
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
Meteor.publish('userList', function (){ 
  return Meteor.users.find({});
});