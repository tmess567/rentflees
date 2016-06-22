Template.listings.helpers({
  listingsCollection() {
    return Listings.find({}, { sort: { createdAt:  -1} });
  },
  markersCollection() {
    return Markers.find({});
  },
});

Template.map.helpers({  
  markersCollection() {
    return Markers.find({});
  },
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }

});

Template.map.onRendered(function() {
  //GoogleMaps.load();
  GoogleMaps.load({ 
      v: '3', 
      key: 'AIzaSyBYV0r7tOHoNY0kKA14nyKxvAxhzZ3v8M8', 
      libraries: 'geometry,places' 
    });
});

Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
    google.maps.event.addListener(map.instance, 'click', function(event) {
      Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      console.log(event.latLng.lat());


        //var mapRef = document.getElementsByClassName("map-canvas")[0];
        //var input = document.getElementById('pac-input');
        //var searchBox = new google.maps.places.SearchBox(input);
        //mapRef.controls[google.maps.ControlPosition.TOP_LEFT].push(input);




    placeMarkerAndPanTo(event.latLng, map); 
    function placeMarkerAndPanTo(latLng, map) { 
    var marker = new google.maps.Marker(
      { position: latLng, map: map });
    alert(latLng.lat());
    map.panTo(latLng); 
  }


    });








    // The code shown below goes here
    var markers = {};

    Markers.find().observe({  
      added: function(document) {
        // Create a marker for this document
        var marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.lat, document.lng),
          map: map.instance,
          // We store the document _id on the marker in order 
          // to update the document within the 'dragend' event below.
          id: document._id
        });

        // This listener lets us drag markers on the map and update their corresponding document.
        google.maps.event.addListener(marker, 'dragend', function(event) {
          Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
        });
        alert("Hello " + event.latLng.lat());
        // Store this marker instance within the markers object.
        markers[document._id] = marker;
      },
      changed: function(newDocument, oldDocument) {
        markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
      },
      removed: function(oldDocument) {
        // Remove the marker from the map
        markers[oldDocument._id].setMap(null);

        // Clear the event listener
        google.maps.event.clearInstanceListeners(
          markers[oldDocument._id]);

        // Remove the reference to this marker instance
        delete markers[oldDocument._id];
      }
    });



  });
});
