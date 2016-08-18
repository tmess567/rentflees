import {FlowRouter} from 'meteor/kadira:flow-router';
Meteor.subscribe('listings');
var imageName = null;
var latitude = -37.8136;
var longitude = 144.9631;
Uploader.finished = function(index, fileInfo, templateContext) {
	//console.log(fileInfo.uploadedName);
	//console.log(Meteor.user().services.facebook.id);
	document.getElementById("uploadedImg").style.display = "block";
	document.getElementById("uploadedImg").src = '/upload/' + fileInfo.uploadedName;
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
        //Router.go('/');
  		} else {
  			this.done(new Error("Submission failed"));
  		}
      //Listings.insert(insertDoc);
  		return true;
  	},


  },




 });


Template.mapAdd.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 8
      }
    }
  }

});

Template.mapAdd.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    //previous key : AIzaSyBYV0r7tOHoNY0kKA14nyKxvAxhzZ3v8M8
    key: 'AIzaSyBiTVrSTOhuNSaxTT29FqS1bsa3OXHhulc',
    //'AIzaSyBGuxb2ewAPUA2TZScpgdXqKAiLYYEJ3fw', //places key for local testing
    //'AIzaSyBiTVrSTOhuNSaxTT29FqS1bsa3OXHhulc' //JS key

    libraries: 'geometry,places'
  });
});

Template.mapAdd.onCreated(function() {
  var marker;
  GoogleMaps.ready('map', function(map) {

    marker = new google.maps.Marker(
      {
        position: {lat: latitude, lng: longitude}, map: map.instance, draggable: true });

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
