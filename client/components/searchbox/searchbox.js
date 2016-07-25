Template.searchbox.onRendered(function(){
  	$('.searchbox .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var city = $(this).attr("href").replace("#","");
		var cityName = $(this).text();
		$('.searchbox span#city-span').text(cityName);
		$('.searchbox #city').val(city);
  	});

  	$(".searchbox *").focus(function(e){
	    console.log("focus in");
	    $(this).closest('.searchbox').addClass("focus");
	}).blur(function(e){
	    console.log("out");
	    $(this).closest('.searchbox').removeClass("focus");
	});
});