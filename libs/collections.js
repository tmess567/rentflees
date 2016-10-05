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
  	'category', 
  	'owner', 
    'foodstr',
  	'amenitiesstr',
  	'description',
    'city',
    'tenantPref'
  ],
  engine: new EasySearch.Minimongo(),
  aggregation: '$and'
});