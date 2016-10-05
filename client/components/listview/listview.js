var listingsIndexVar = null;
var listingArr = null;
var listingsIndexDep = new Tracker.Dependency();
var mapAdded = false;
var searchInit = true;

Meteor.subscribe('listings');

Template.listview.onCreated(function(){
	listingArr = Listings.find().fetch();
	listingsIndexDep.changed();
});

Template.listview.rendered = function() {
	listingArr = Listings.find().fetch();
	listingsIndexDep.changed();
};

Template.listview.helpers({
	listingsArr : function() {
		listingsIndexDep.depend();
		console.log(listingArr);
	 	return searchInit || listingArr.length === 0 ?Listings.find().fetch():listingArr;
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
	$('input[name=tenantPref]').click(function(evt){
		searchInit = false;
		listingArr = [];
		$('input[name=tenantPref]').each(function(){
			if($(this).is(":checked")){
				console.log("Searching for "+$(this).val());
				listingArr = listingArr.concat(Listings.find({tenantPref : $(this).val()}).fetch());
			}
		});
		listingsIndexDep.changed();
		console.log(listingArr);
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
