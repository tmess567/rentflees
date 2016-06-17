Template.listings.helpers({
  listingsCollection() {
    return Listings.find({}, { sort: { createdAt:  -1} });
  },
});