Template.searchBox.helpers({
  listingsIndex: () => ListingsIndex
});
Template.searchBox.rendered = function(){
	$('.easy-search-input-container > input').addClass('form-control');
	$('.easy-search-input-container > input').addClass('search-input');
	$('.easy-search-input-container > input').attr('placeholder', 'Search')
};