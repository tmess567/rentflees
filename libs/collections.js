Listings = new Mongo.Collection('listings');
Listings.allow({
	insert: function(userId, doc)
	{
		return !!userId;
	}
});