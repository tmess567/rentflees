Template.index.onRendered(function(){
	$('.banner[data-city]').hover(function(e){
	  console.log('Hover');
	  $(this).children('.overlay').toggleClass('hidden');
	  var city = $(this).attr('data-city');
	  $('#top-cities-div').toggleClass('bg-' + city);
	});

	$('.city-card').hover(function(e){
		$(this).toggleClass('hover');
	});
	
	$('.fade-slider').slick({
		arrows: false,
		draggable: false,
		fade: true,
		autoplay: true,
  		autoplaySpeed: 1500,
  		speed: 1000,
	});
});