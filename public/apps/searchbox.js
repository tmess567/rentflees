$('.searchbox .dropdown-menu').find('a').click(function(e) {
  e.preventDefault();
  var param = $(this).attr("href").replace("#","");
  var concept = $(this).text();
  $('.searchbox span#city-span').text(concept);
  $('.input-group #city').val(param);
});