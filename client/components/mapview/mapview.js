var listingsIndexVar = null;
var currCity = "";
var currAmenities = "";
var searchString = "";
var listingsIndexDep = new Tracker.Dependency();
var target = null;

function updateSearchString() {
	searchString = currCity + currAmenities;
	console.log("searchString = " + searchString);
}

function updateIndex() {
	updateSearchString();
	/*listingsIndexVar = ListingsIndex.search(searchString).fetch();
	listingsIndexDep.changed();*/
	$("#searchBoxContainer>input").val(searchString);
	ListingsIndex.getComponentMethods().search(searchString)
}

Template.horizontalListingCard.helpers({
	isVerified : function() {
  		console.log(this.verified === "true");
  		return this.verified === "true";
  	}
});

Template.searchBox.helpers({
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

Template.searchBox.rendered = function() {
	listingsIndexVar = ListingsIndex.search(searchString).fetch();
	listingsIndexDep.changed();
};

Template.searchBox.rendered = function(){
	$('.easy-search-input-container > input').addClass('form-control');
	$('.easy-search-input-container > input').addClass('search-input');
	$('.easy-search-input-container > input').attr('placeholder', 'Search')
};
Template.searchBox.events({
	"click .city-dropdown > li" : function(evt) {
		$(".city-btn").html(evt.target.innerHTML + "<span class=\"caret\"></span>");
		if(evt.target.innerHTML === "All Cities") {
			currCity = "";
			updateIndex();
		}
		else {
			currCity = evt.target.innerHTML + " " ;
			updateIndex();
		}
	},
	"click .amenities-dropdown > li" : function(evt) {
		if ($(evt.target).hasClass("selected")) {
			currAmenities = currAmenities.replace(evt.target.innerHTML + " ", "");
			updateIndex();
		} else {
			currAmenities += evt.target.innerHTML + " ";
			updateIndex();
		}
		$(evt.target).toggleClass("selected");
	}
});
Template.listingCard.events({
	"click .card-listing" : function(evt){
		window.location.href="/aboutHome?id="+this._id;
	}
});