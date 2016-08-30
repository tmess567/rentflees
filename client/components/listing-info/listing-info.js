var currListing = null;
var currListingID = null;
var currListingDep = new Tracker.Dependency();
Meteor.subscribe('listings');
Template.listing_info.helpers({
	images: ['images/home1.jpg','images/home2.jpg','images/home3.jpg','images/home4.jpg','images/home5.jpg'],
	routeHasID: function(){
		currListingDep.depend();
		return (FlowRouter.current().queryParams.id === undefined);
	},
	listing: function(){
		currListingDep.depend();
		if(currListingID === null)
			return "";
		return Listings.findOne({_id: currListingID});
	},
	isAdmin : function() { 
	    console.log("checking admin");
		return Meteor.user().username === "Tushar Mishra";
	},
	isVerified : function(){
		currListingDep.depend();
		if(currListingID === null)
			return "";
		return Listings.findOne({_id: currListingID}).verified === "true";
	}
});

Template.listing_info.onCreated(function(){
	currListingID = FlowRouter.current().queryParams.id;
	currListingDep.changed();
});

Template.listing_info.onRendered(function(){
	$('.listing-photo-carousel').slick();
	$('.dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		console.log("DROP");
		//var place = $(this).attr("href").replace("#","");
		var placeName = $(this).text();
		$('#selected-nearby-place').text(placeName);
		//$('.searchbox #city').val(city);
  	});
  	$('.similar-listing-carousel').slick({
  		slidesToShow: 3,
  		slidesToScroll: 3,
  		responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
  	});
});