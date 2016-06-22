Meteor.subscribe('listings');
Uploader.finished = function(index, fileInfo, templateContext) {
	console.log(fileInfo.uploadedName);
	//console.log(Meteor.user().services.facebook.id);
	document.getElementById("uploadedImg").style.display = "block";
	document.getElementById("uploadedImg").src = 'http://localhost:3000/upload/' + fileInfo.uploadedName;
}

Template.traceMap.helpers({
	/*
	var map;
	function initMap() {
	  map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: -34.397, lng: 150.644},
	    zoom: 8
	  });
	}
	*/
});

Template.traceMap.onRendered(function() {
	   $.getScript("https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBYV0r7tOHoNY0kKA14nyKxvAxhzZ3v8M8&libraries=geometry,places&callback=GoogleMaps.initialize");
});