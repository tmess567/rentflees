$('#sign-in-toggle,#create-acc').click(function(e){
  console.log('CCC');
  $('.internal-login').toggleClass('hidden');
  $('.sign-up').toggleClass('hidden');
});

$('input[type="checkbox"], input[type="radio"]').iCheck({
  checkboxClass: 'icheckbox_minimal-blue',
  radioClass: 'iradio_minimal-blue'
});
