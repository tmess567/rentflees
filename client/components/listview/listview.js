var listingsIndexDep = new Tracker.Dependency();
var mapAdded = false;
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
	}
});

Template.listview.onRendered(function(){

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
				console.log("Searching for "+$(this).val());
				if(!searchObj.hasOwnProperty("tenantPref")){
					searchObj["tenantPref"] = { $in: [] };
					console.log(searchObj);
				}
				if(searchObj.tenantPref.$in.indexOf($(this).val())<0)
					searchObj.tenantPref.$in.push($(this).val());
				if(searchObj.hasOwnProperty("tenantPref")) console.log(searchObj.tenantPref.$in);
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
				console.log("Searching for "+$(this).val());
				if(!searchObj.hasOwnProperty("type")){
					searchObj["type"] = { $in: [] };
					console.log(searchObj);
				}
				if(searchObj.type.$in.indexOf($(this).val())<0)
					searchObj.type.$in.push($(this).val());
				if(searchObj.hasOwnProperty("type")) console.log(searchObj.type.$in);
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
				console.log("Searching for "+$(this).val());
				if(!searchObj.hasOwnProperty("furnishing")){
					searchObj["furnishing"] = { $in: [] };
					console.log(searchObj);
				}
				if(searchObj.furnishing.$in.indexOf($(this).val())<0)
					searchObj.furnishing.$in.push($(this).val());
				if(searchObj.hasOwnProperty("furnishing")) console.log(searchObj.furnishing.$in);
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
				console.log("Searching for "+$(this).val());
				if(!searchObj.hasOwnProperty("amenities")){
					searchObj["amenities"] = { $all: [] };
					console.log(searchObj);
				}
				if(searchObj.amenities.$all.indexOf($(this).val())<0)
					searchObj.amenities.$all.push($(this).val());
				if(searchObj.hasOwnProperty("amenities")) console.log(searchObj.amenities.$all);
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
				console.log("Searching for "+$(this).val());
				if(!searchObj.hasOwnProperty("foodServices")){
					searchObj["foodServices"] = { $all: [] };
					console.log(searchObj);
				}
				if(searchObj.foodServices.$all.indexOf($(this).val())<0)
					searchObj.foodServices.$all.push($(this).val());
				if(searchObj.hasOwnProperty("foodServices")) console.log(searchObj.foodServices.$all);
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
				console.log("Searching for "+$(this).val());
				if(!searchObj.hasOwnProperty("amenities")){
					searchObj["amenities"] = { $all: [] };
					console.log(searchObj);
				}
				if(searchObj.amenities.$all.indexOf($(this).val())<0)
					searchObj.amenities.$all.push($(this).val());
				if(searchObj.hasOwnProperty("amenities")) console.log(searchObj.amenities.$all);
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
		$("#map-panel").toggleClass("map-panel");
		$(".map-container-container").toggleClass("hidden");
	});
});
