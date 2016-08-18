$(function(){
	$(document).click(function(){
		//console.log('doc click');
		$('ul.select-menu.open').removeClass('open');
	});
	$('.select').click(function(e){
		console.log('.select open');
		$('ul.select-menu.open').removeClass('open');
		var list = $(this).next('ul.select-menu');
		list.css('left',$(this).position().left + 'px');
		list.toggleClass('open');
		list.children().removeClass('focus');
		e.stopPropagation();
	});
	$('.select + ul > li').click(function(e){
		console.log('.select li Click');
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		$(this).parent().prev().html($(this).html() + ' <span class="caret"></span>');
	});
	$('.select').keydown(function(e){
		e.preventDefault();
    	console.log('keydown: '+ e.target.nodeName);
    	var x = $(this).next().children('li.focus');
    	if(x.length == 0)
    		x = $(this).next().children('li.active');
    	if(x.length == 0)
    		return;
    	x = $(x[0]);
        e.preventDefault();
        x.removeClass('focus'); 
        if (e.keyCode == 40) {
            x.next().addClass('focus');       
        }
        if (e.keyCode == 38) {      
            x.prev().addClass('focus');       
        }
        e.stopPropagation();
    });
	//$('.pac-container.pac-logo').css('z-index','1030');
});