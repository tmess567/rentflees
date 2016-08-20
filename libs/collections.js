Listings = new Mongo.Collection('listings');
Markers = new Mongo.Collection('markers');
Listings.allow({
	insert: function(userId, doc)
	{
		return !!userId;
	}
});
ListingsIndex = new EasySearch.Index({
  collection: Listings,
  fields: [
  	'title', 
  	'address', 
  	'type', 
  	'category', 
  	'owner', 
    'foodstr',
  	'amenitiesstr',
  	'description',
    'city'
  ],
  engine: new EasySearch.Minimongo(),
  aggregation: '$and'
});