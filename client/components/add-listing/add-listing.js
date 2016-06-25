Meteor.subscribe('listings');
var imageName = null;
var latitude;
var longitude;
Uploader.finished = function(index, fileInfo, templateContext) {
	//console.log(fileInfo.uploadedName);
	//console.log(Meteor.user().services.facebook.id);
	document.getElementById("uploadedImg").style.display = "block";
	document.getElementById("uploadedImg").src = 'http://localhost:3000/upload/' + fileInfo.uploadedName;
	imageName = fileInfo.uploadedName;
}
AutoForm.hooks({
  addListingForm: {
  	onSubmit: function (insertDoc, updateDoc, currentDoc) {
  		this.event.preventDefault()
      // Inserting the coordinates
      insertDoc.XCoordinate = latitude;
      insertDoc.YCoordinate = longitude;
  		if(imageName != null){
  			insertDoc.image = imageName;
  			Listings.insert(insertDoc);
  			console.log("Done");
  		} else {
  			this.done(new Error("Submission failed"));
  		}
      //Listings.insert(insertDoc);
  		return false;
  	},


  },

   


 });


Template.mapAdd.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }

});

Template.mapAdd.onRendered(function() {
  GoogleMaps.load({ 
    v: '3', 
    key: 'AIzaSyBYV0r7tOHoNY0kKA14nyKxvAxhzZ3v8M8', 
    libraries: 'geometry,places' 
  });
});

Template.mapAdd.onCreated(function() { 
  var marker;
  GoogleMaps.ready('map', function(map) {

    marker = new google.maps.Marker(
      { 
        position: {lat: -37.8136, lng: 144.9631}, map: map.instance, draggable: true });

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      } 
      if (places.length == 1){
        map.instance.panTo(places[0].geometry.location);
        marker.setPosition(places[0].geometry.location);
      }
    });

    google.maps.event.addListener(map.instance, 'click', function(event) {
      marker.setPosition(event.latLng);
      latitude = event.latLng.lat();
      longitude = event.latLng.lng();
    });


  });
});


  //document.getElementById("addListingForm").elements.namedItem("YCoordinate").value = "x";
