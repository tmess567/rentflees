var currListing = null;
var currListingID = null;
var currListingDep = new Tracker.Dependency();
Meteor.subscribe('listings');
Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase().replace(/ /g,'').replace(/-/g,'');
});
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
		return Meteor.user()._id === "mhKAqhoR76bQQfpPc";
	},
	isVerified : function(){
		currListingDep.depend();
		if(currListingID === null)
			return "";
		return Listings.findOne({_id: currListingID}).verified === "true";
	},
	isOwner: function(){
		currListingDep.depend();
		if(currListingID === null)
			return "";
		return Listings.findOne({_id: currListingID}).owner === Meteor.user()._id;
	},
	ownerUname: function(){
		let ownerID = Listings.findOne({_id: currListingID}).owner;
		return Meteor.users.findOne({_id: ownerID}).profile.realName;
	},
	enableEdit: function(){
		$(".editNotEnabled").hide();
		$(".editEnabled").show();
	},
	updateRent: function(){
		let newRent = $("#rentInput").val();
		Listings.update(
			{'_id': currListingID},
			{$set: {'rent': newRent}});
		$(".editNotEnabled").show();
		$(".editEnabled").hide();
	},
	convenienceFee: function(){
		let rent = Listings.findOne({_id: currListingID}).rent;
		return 0;
	},
	gatewayCharge: function(){
		let rent = Listings.findOne({_id: currListingID}).rent;
		return 0.05*rent;
	},
	totalCost: function(){
		let rent = Listings.findOne({_id: currListingID}).rent;
		return rent + 0.05*rent;
	}
});

Template.listing_info.events({
	'click #enableEdit': function(evt){
		$(".editNotEnabled").hide();
		$(".editEnabled").show();
	},
	'click #updateRent': function(evt){
		let newRent = $("#rentInput").val();
		Listings.update(
			{'_id': currListingID},
			{$set: {'rent': newRent}});
		$(".editNotEnabled").show();
		$(".editEnabled").hide();
	}
})

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

function enableEdit(){
	$(".editNotEnabled").hide();
	$(".editEnabled").show();
}

function updateRent(){
	let newRent = $("#rentInput").val();
	Listings.update(
		{'_id': currListingID},
		{$set: {'rent': newRent}});
	$(".editNotEnabled").show();
	$(".editEnabled").hide();
}