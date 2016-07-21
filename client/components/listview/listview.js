Template.listview.helpers({
	images:['home1.jpg' ,'home2.jpg','home3.jpg','home4.jpg','home5.jpg','home6.jpg','home7.jpg','home8.jpg','home10.jpg']
});

Template.listview.onRendered(function(){
	$('.img-wrapper').slick({
		lazyLoad: 'ondemand',
		arrows: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});
});