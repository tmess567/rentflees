Template.searchbox.onRendered(function(){
  $('.searchbox .dropdown-menu').find('a').click(function(e) {
      e.preventDefault();
      var city = $(this).attr("href").replace("#","");
      var cityName = $(this).text();
      $('.searchbox span#city-span').text(cityName);
      $('.searchbox #city').val(city);
  });
});