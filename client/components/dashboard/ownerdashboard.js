//Meteor.subscribe("tenantDir");
Meteor.subscribe("currentUserData");
Template.listings.helpers({
  listingsCollection() {
    console.log(Listings.find({}, { sort: { createdAt:  -1} }) );
    return Listings.find({}, { sort: { createdAt:  -1} }) ;
  }
  /*
  tenant() {
  	return tenantDir.find({});
  }
  */
});