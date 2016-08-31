var listingsIndexVar = null;
var currCity = "";
var currAmenities = "";
var searchString = "";
var listingsIndexDep = new Tracker.Dependency();

Template.listview.helpers({
	listingsIndex : function() {
	  	listingsIndexDep.depend();
	  	return listingsIndexVar===null?ListingsIndex:listingsIndexVar;
	},
	listingsArr : function() {
	 	listingsIndexDep.depend();
	  	return listingsIndexVar===null?ListingsIndex.search(searchString).fetch():listingsIndexVar;
	},
	isVerified : function() {
	  	console.log(this.verified === "true");
	  	return this.verified === "true";
	}
});

Template.listview.onRendered(function(){
	$('.img-wrapper').slick({
		lazyLoad: 'ondemand',
		arrows: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});
});
