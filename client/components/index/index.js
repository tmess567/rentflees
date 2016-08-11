Template.index.onRendered(function(){
	$('.banner[data-city]').hover(function(e){
	  console.log('Hover');
	  $(this).children('.overlay').toggleClass('hidden');
	  var city = $(this).attr('data-city');
	  $('#top-cities-div').toggleClass('bg-' + city);
	});

	$('.photo').slick({
		dots: false,
		arrows: false,
		infinite: true,
	  	speed: 500,
	  	fade: true,
	  	cssEase: 'linear',
	  	slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		//centerMode: true,
  		//variableWidth: true
	});
});