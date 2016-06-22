Template.listings.helpers({
  listingsCollection() {
    return Listings.find({}, { sort: { createdAt:  -1} });
  }
});

Template.map.helpers({
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
  GoogleMaps.load({ 
    v: '3', 
    key: 'AIzaSyBYV0r7tOHoNY0kKA14nyKxvAxhzZ3v8M8', 
    libraries: 'geometry,places' 
  });
});

Template.map.onCreated(function() { 
  var marker;
  GoogleMaps.ready('map', function(map) {

    marker = new google.maps.Marker(
      { position: {lat: -37.8136, lng: 144.9631}, map: map.instance, draggable: true });

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
    });
  });
});
