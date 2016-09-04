var listingsIndexVar = null;
var listingArr = null;
var listingsIndexDep = new Tracker.Dependency();
var mapAdded = false;

Template.listview.rendered = function() {
	listingsArr = ListingsIndex.search("").fetch();
	listingsIndexDep.changed();
};

Template.listview.helpers({
	listingsArr : function() {
	 	return Listings.find().fetch();
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

Template.listview.onCreated(function(){
	console.log("called");
	listingArr = ListingsIndex.search("").fetch();
});

Template.listview.onRendered(function(){
	$('input[name=tenantPref]').click(function(evt){
		listingArr = [];
		$('input[name=tenantPref]').each(function(){
			if($(this).is(":checked")){
				listingArr.concat(ListingsIndex.search({tenantPref : $(this).val()}).fetch());
			}
		});
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
