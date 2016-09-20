Template.searchbox.onRendered(function(){
  	$('.searchbox .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var city = $(this).attr("href").replace("#","");
		var cityName = $(this).text();
		$('#autocomplete').val(city);
		$('#autocomplete').focus();		
		$('.searchbox span#city-span').text(cityName);
  	});

  	$(".searchbox *").focus(function(e){
	    console.log("focus in");
	    $(this).closest('.searchbox').addClass("focus");
	}).blur(function(e){
	    console.log("out");
	    $(this).closest('.searchbox').removeClass("focus");
	});

	$("#autocomplete").focus(function(e){
		var placeSearch, autocomplete;
			initAutocomplete();
	    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
	});
	$(".go").click(function(e){
		let query = $("#autocomplete").val();
		if(query !== "")
			window.location.href="/map?q="+query;
	});
	GoogleMaps.load({
    v: '3',
    key: 'AIzaSyBiTVrSTOhuNSaxTT29FqS1bsa3OXHhulc',
    libraries: 'geometry,places'
  });
  
/*GoogleMaps.ready('map', function(map) {
	
      
});*/

});
      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        console.log("init");
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', gotoList());
      }

      function gotoList() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();
        console.log(place);
      }