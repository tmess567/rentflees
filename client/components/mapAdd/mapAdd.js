var latitude = 30.325558;
var longitude = 77.9470939;

Template.mapAdd.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      console.log('Map Loaded');
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
    key: 'AIzaSyBiTVrSTOhuNSaxTT29FqS1bsa3OXHhulc',
    libraries: 'geometry,places'
  });
  console.log("Map Rendered");
});

Template.mapAdd.onCreated(function() {
  var marker;
  GoogleMaps.ready('map', function(map) {
    marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude}, zoom: 17,
      map: map.instance, draggable: true, 
    });
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

Template.mapAddNoMarker.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      console.log('Map Loaded');
      return {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 8
      }
    }
  }

});

Template.mapAddNoMarker.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    key: 'AIzaSyBiTVrSTOhuNSaxTT29FqS1bsa3OXHhulc',
    libraries: 'geometry,places'
  });
  console.log("Map Rendered");
});