var listingsIndexDep = new Tracker.Dependency();
var mapAddedDep = new Tracker.Dependency();
var mapAdded = false;
var markers = [];
var infowindows = [];
var searchObj = {
	rent: {
		$gt: 14000,
		$lt: 40000
	}
};
var sortObj = {sort: {rent: 1}};

Meteor.subscribe('listings');

Template.listview.helpers({
	listingsArr : function() {
		listingsIndexDep.depend();
		clearAndAddMarkers();
		console.log(searchObj);
	 	return Listings.find(searchObj, sortObj).fetch();
	},
	isVerifiedorAdmin : function() {
	  	return (this.verified === "true" || Meteor.user().username === "Tushar Mishra" );
	},
	isVerified : function() {
	  	return this.verified === "true";
	},
	isAdmin : function() {
	  	return Meteor.user().username === "Tushar Mishra";
	},
	mapShown : function(){
		mapAddedDep.depend();
		return mapAdded;
	}
});

Template.listview.onRendered(function(){

	$(".filterLabel>img").on("click", function(evt){
		let r = evt.target.src;
		if(r.indexOf("filterLabelGrey")>=0)
		  evt.target.src = r.replace("filterLabelGrey", "filterLabelBlue");
		if(r.indexOf("filterLabelBlue")>=0)
		  evt.target.src = r.replace("filterLabelBlue", "filterLabelGrey");
	});

	let rentSlider = $("#rentSlider").slider({}).data('slider');
	rentSlider.on('slide', function(){
		searchInit = false;
		$("#price-range-div").html(
			"₹ "+rentSlider.getValue()[0]+" - ₹ "+rentSlider.getValue()[1]
			);
		searchObj["rent"] = { $gt: rentSlider.getValue()[0], $lt: rentSlider.getValue()[1]};
		listingsIndexDep.changed();
	});

	$("#sort").on('change', function() {
	  if($(this).val() === "rentL2H"){
	  	sortObj = {sort: {rent: 1}};
	  } else {
	  	sortObj = {sort: {rent: -1}};
	  }
	  listingsIndexDep.changed();
	});

	$('input[name=tenantPref]').click(function(evt){
		searchInit = false;
		$('input[name=tenantPref]').each(function(){
			if($(this).is(":checked")){
				if(!searchObj.hasOwnProperty("tenantPref"))
					searchObj["tenantPref"] = { $in: [] };
				if(searchObj.tenantPref.$in.indexOf($(this).val())<0)
					searchObj.tenantPref.$in.push($(this).val());
			} else {
				if(searchObj.hasOwnProperty("tenantPref")){
					for(let i = searchObj.tenantPref.$in.length - 1; i >= 0; i--) {
					    if(searchObj.tenantPref.$in[i] === $(this).val()) {
					       searchObj.tenantPref.$in.splice(i, 1);
					    }
					}
					if(searchObj.tenantPref.$in.length == 0){
						delete searchObj.tenantPref;
					}
				}
			}
		});
		listingsIndexDep.changed();
	});

	$('input[name=type]').click(function(evt){
		searchInit = false;
		$('input[name=type]').each(function(){
			if($(this).is(":checked")){
				if(!searchObj.hasOwnProperty("type")){
					searchObj["type"] = { $in: [] };
				}
				if(searchObj.type.$in.indexOf($(this).val())<0)
					searchObj.type.$in.push($(this).val());
			} else {
				if(searchObj.hasOwnProperty("type")){
					for(let i = searchObj.type.$in.length - 1; i >= 0; i--) {
					    if(searchObj.type.$in[i] === $(this).val()) {
					       searchObj.type.$in.splice(i, 1);
					    }
					}
					if(searchObj.type.$in.length == 0){
						delete searchObj.type;
					}
				}
			}
		});
		listingsIndexDep.changed();
	});

	$('input[name=furnishing]').click(function(evt){
		searchInit = false;
		$('input[name=furnishing]').each(function(){
			if($(this).is(":checked")){
				if(!searchObj.hasOwnProperty("furnishing")){
					searchObj["furnishing"] = { $in: [] };
				}
				if(searchObj.furnishing.$in.indexOf($(this).val())<0)
					searchObj.furnishing.$in.push($(this).val());
			} else {
				if(searchObj.hasOwnProperty("furnishing")){
					for(let i = searchObj.furnishing.$in.length - 1; i >= 0; i--) {
					    if(searchObj.furnishing.$in[i] === $(this).val()) {
					       searchObj.furnishing.$in.splice(i, 1);
					    }
					}
					if(searchObj.furnishing.$in.length == 0){
						delete searchObj.furnishing;
					}
				}
			}
		});
		listingsIndexDep.changed();
	});
	
	$('input[name=amenities]').click(function(evt){
		searchInit = false;
		$('input[name=amenities]').each(function(){
			if($(this).is(":checked")){
				if(!searchObj.hasOwnProperty("amenities"))
					searchObj["amenities"] = { $all: [] };
				if(searchObj.amenities.$all.indexOf($(this).val())<0)
					searchObj.amenities.$all.push($(this).val());
			} else {
				if(searchObj.hasOwnProperty("amenities")){
					for(let i = searchObj.amenities.$all.length - 1; i >= 0; i--) {
					    if(searchObj.amenities.$all[i] === $(this).val()) {
					       searchObj.amenities.$all.splice(i, 1);
					    }
					}
					if(searchObj.amenities.$all.length == 0){
						delete searchObj.amenities;
					}
				}
			}
		});
		listingsIndexDep.changed();
	});

	$('input[name=foodServices]').click(function(evt){
		searchInit = false;
		$('input[name=foodServices]').each(function(){
			if($(this).is(":checked")){
				if(!searchObj.hasOwnProperty("foodServices"))
					searchObj["foodServices"] = { $all: [] };
				if(searchObj.foodServices.$all.indexOf($(this).val())<0)
					searchObj.foodServices.$all.push($(this).val());
			} else {
				if(searchObj.hasOwnProperty("foodServices")){
					for(let i = searchObj.foodServices.$all.length - 1; i >= 0; i--) {
					    if(searchObj.foodServices.$all[i] === $(this).val()) {
					       searchObj.foodServices.$all.splice(i, 1);
					    }
					}
					if(searchObj.foodServices.$all.length == 0){
						delete searchObj.foodServices;
					}
				}
			}
		});
		listingsIndexDep.changed();
	});

	$('input[name=building-amenities]').click(function(evt){
		searchInit = false;
		$('input[name=building-amenities]').each(function(){
			if($(this).is(":checked")){
				if(!searchObj.hasOwnProperty("amenities"))
					searchObj["amenities"] = { $all: [] };
				if(searchObj.amenities.$all.indexOf($(this).val())<0)
					searchObj.amenities.$all.push($(this).val());
			} else {
				if(searchObj.hasOwnProperty("amenities")){
					for(let i = searchObj.amenities.$all.length - 1; i >= 0; i--) {
					    if(searchObj.amenities.$all[i] === $(this).val()) {
					       searchObj.amenities.$all.splice(i, 1);
					    }
					}
					if(searchObj.amenities.$all.length == 0){
						delete searchObj.amenities;
					}
				}
			}
		});
		listingsIndexDep.changed();
	});

	$('.img-wrapper').slick({
		lazyLoad: 'ondemand',
		arrows: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$("#show-map-button").click(function(evt){
		$("#filter-map-button").show();
		if($(".map-container-container").hasClass("hidden"))
			$("#show-map-button").text("Hide Map View");
		else
			$("#show-map-button").text("Show Map View");
		$("#map-panel").toggleClass("map-panel");
		$(".map-container-container").toggleClass("hidden");
		mapAdded = true;
		mapAddedDep.changed();

		let listingArrLocal = Listings.find(searchObj, sortObj).fetch();
		let mapObj = null, mapObjInit = false;

		GoogleMaps.ready('mapNoMarker', function(map) {
			console.log(hasParams());
			if(hasParams()){
				console.log("has been searched");
				setCenterLocation();
			}
			else
				addMarkers();
			mapObjInit = true;
		});
	});

	$("#filter-map-button").on('click', function(evt){
		$("#show-all-map-button").show();
		filterByMap();
	});

	$("#show-all-map-button").on("click", function(){
		if(searchObj.hasOwnProperty("XCoordinate"))
			delete searchObj.XCoordinate;
		if(searchObj.hasOwnProperty("YCoordinate"))
			delete searchObj.YCoordinate;
		listingsIndexDep.changed();
	});
});

function filterByMap(){
	if (!(typeof google === 'undefined' || google === null)) {

			if(!searchObj.hasOwnProperty("XCoordinate"))
				searchObj["XCoordinate"] = { 
					$gt: GoogleMaps.maps.mapNoMarker.instance.getBounds().getSouthWest().lat().toString(),
					$lt: GoogleMaps.maps.mapNoMarker.instance.getBounds().getNorthEast().lat().toString() };
			else
				searchObj.XCoordinate = { 
					$gt: GoogleMaps.maps.mapNoMarker.instance.getBounds().getSouthWest().lat().toString(),
					$lt: GoogleMaps.maps.mapNoMarker.instance.getBounds().getNorthEast().lat().toString() };
			if(!searchObj.hasOwnProperty("YCoordinate"))
				searchObj["YCoordinate"] = { 
					$gt: GoogleMaps.maps.mapNoMarker.instance.getBounds().getSouthWest().lng().toString(),
					$lt: GoogleMaps.maps.mapNoMarker.instance.getBounds().getNorthEast().lng().toString() };
			else
				searchObj.YCoordinate = { 
					$gt: GoogleMaps.maps.mapNoMarker.instance.getBounds().getSouthWest().lng().toString(),
					$lt: GoogleMaps.maps.mapNoMarker.instance.getBounds().getNorthEast().lng().toString() };
			
			listingsIndexDep.changed();
			//clearAndAddMarkers();
		}
}

function addMarkers(){
	if (!(typeof google === 'undefined' || google === null 
			|| GoogleMaps.maps.mapNoMarker === undefined)) {
		for(k of Listings.find(searchObj, sortObj).fetch()) {
			let latlng = new google.maps.LatLng(k.XCoordinate, k.YCoordinate);
			let infowindow = new google.maps.InfoWindow({
	          content: 
	          "<b>Title:</b> "+k.title + 
	          " <br/><b>Address:</b> "+k.address +
	          " <br/><a href='aboutHome?id="+k._id+"'>View Listing Details</a>"
	        });
	        console.log(latlng);	
			createMarker(latlng, k.title, k._id,
				GoogleMaps.maps.mapNoMarker.instance, infowindow);
	    }
		let mapObj = GoogleMaps.maps.mapNoMarker.instance;
		var newBoundary = new google.maps.LatLngBounds();

		for(index in markers){
		  var position = markers[index].position;
		  newBoundary.extend(position);
		}

		mapObj.fitBounds(newBoundary);
	}
}

function createMarker(latlng, titleApp, idApp, mapObj, infowindow){
	let marker=(new google.maps.Marker({
	    position: latlng, zoom: 17,
	    map: mapObj, 
	    draggable: false, 
	    title: titleApp,
	    id: idApp
	}));
	marker.addListener('click', function() {
		closeAllInfoWindows();
        infowindow.open(mapObj, marker);
        infowindows.push(infowindow);
    });
	markers.push(marker);
}

function clearAndAddMarkers(){
	for(marker of markers)
		marker.setMap(null);
	addMarkers();
}

function closeAllInfoWindows(){
	for(infowindow of infowindows)
		infowindow.close();
	addMarkers();
}

function setCenterLocation(){
	let currCenter = null;
	currCenter = new google.maps.LatLng(
		FlowRouter.current().queryParams.lat,
		FlowRouter.current().queryParams.lng);

	GoogleMaps.maps.mapNoMarker.instance.setCenter(currCenter);
	GoogleMaps.maps.mapNoMarker.instance.setZoom(14);
	filterByMap();

	return currCenter;

}

function hasParams(){
	return (FlowRouter.current().queryParams.lat !== undefined
		&& FlowRouter.current().queryParams.lng !== undefined);
}