$('#sign-in-toggle,#create-acc').click(function(e){
  console.log('CCC');
  $('.internal-login').toggleClass('hidden');
  $('.sign-up').toggleClass('hidden');
});

$('input[type="checkbox"], input[type="radio"]').iCheck({
  checkboxClass: 'icheckbox_minimal-blue',
  radioClass: 'iradio_minimal-blue'
});
$('#price-range').ionRangeSlider({
  onChange:function (data) {
    console.log(data);
    var value = '&#8377; ' + data.fromNumber + ' - &#8377; ' + data.toNumber;
    $('#price-range-div').html(value);
  }
});