$(document).load(function(){
  $('#sign-in-toggle,#create-acc').click(function(e){
    console.log('CCC');
    $('.internal-login').toggleClass('hidden');
    $('.sign-up').toggleClass('hidden');
  });
});