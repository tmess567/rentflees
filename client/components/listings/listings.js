Template.listings.helpers({
  listingsCollection() {
    return Listings.find({}, { sort: { createdAt:  -1} });
  },
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
    	if(Listings.findOne(Meteor.userId).XCoordinate)
    	{
	    	xCoord = Listings.findOne(Meteor.userId).XCoordinate;
	    	console.log(Listings.findOne(Meteor.userId).XCoordinate);
	    	console.log(Listings.findOne(Meteor.userId).YCoordinate);
	    	yCoord = Listings.findOne(Meteor.userId).YCoordinate;
    	}
    	else
    	{
        	xCoord = 28.8422;
	    	yCoord = 78.7483;
	    	//CDAC 9.0216933,72.7980556,11
    	}
      // Map initialization options
      return {
        center: new google.maps.LatLng(xCoord,yCoord), //home : 28.8422,78.7483
        zoom: 15 //8 for layout
      };
    }
  },
  /*
  map : GoogleMaps.create({
  name: 'exampleMap',
  element: document.getElementById('exampleMap'),
  options: {
    center: new Google.maps.LatLng(-37.8136, 144.9631),
    zoom: 8
  }
})
*/
});


Template.listings.onRendered(function(){
	GoogleMaps.load();
	//GoogleMaps.initialize()
});

Template.listings.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    console.log(map);
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Template.listings.events = {
    "click .traceMap" : function(e){
        var noteID = e.currentTarget.id;
        console.log(noteID);
        Listings.find({_id:noteID}).fetch();
        }
   };