var listingsIndexVar = null;
var listingsIndexDep = new Tracker.Dependency();

Template.searchBox.helpers({
  listingsIndex : function() {
  	listingsIndexDep.depend();
  	return listingsIndexVar===null?ListingsIndex:listingsIndexVar;
  },
  listingsArr : function() {
  	listingsIndexDep.depend();
  	return listingsIndexVar===null?ListingsIndex.search("").fetch():listingsIndexVar;
  }
});

Template.searchBox.rendered = function() {
	listingsIndexVar = ListingsIndex.search("").fetch();
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
		if(evt.target.innerHTML === "All Cities")
			listingsIndexVar = ListingsIndex.search("").fetch();
		else
			listingsIndexVar = ListingsIndex.search(evt.target.innerHTML).fetch();
		listingsIndexDep.changed();
	}
});