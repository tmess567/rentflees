Template.index.onRendered(function(){
	$('.banner[data-city]').hover(function(e){
	  console.log('Hover');
	  $(this).children('.overlay').toggleClass('hidden');
	  var city = $(this).attr('data-city');
	  $('#top-cities-div').toggleClass('bg-' + city);
	});
});