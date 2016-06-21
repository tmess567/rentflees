Listings = new Mongo.Collection('listings');
Markers = new Mongo.Collection('markers');
Listings.allow({
	insert: function(userId, doc)
	{
		return !!userId;
	}
});
Markers.allow({
	insert: function(userId, doc)
	{
		return !!userId;
	}
});