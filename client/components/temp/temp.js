Template.temp.helpers({
	//images:['home1.jpg' ,'home2.jpg','home3.jpg','home4.jpg','home5.jpg','home6.jpg','home7.jpg','home8.jpg','home9.jpg']
});

Template.temp2.onRendered ( function() {
    $('.slider').slick({
      arrows: false,
      draggable: false,
      infinite: false,
      speed: 300,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  onBeforeChange: function(event, currentSlide, nextSlide){
		  	console.log(currentSlide, nextSlide);
		  	if(nextSlide > currentSlide)
		  		$("ul.form-progress > li:nth-child("+ (nextSlide+1) +")").addClass("active");
		  	else
		  		$("ul.form-progress > li:nth-child("+ (currentSlide+1) +")").removeClass("active");
		}
	  /*
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3,
	        infinite: true,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	    // You can unslick at a given breakpoint now by adding:
	    // settings: "unslick"
	    // instead of a settings object
	  ]*/
    });
	$("#file").change(function(){
	    readURL(this);
	});

	$('.next-step').click(function(e){
		e.preventDefault();
		console.log("NEXT");
		$('.slider').slickNext();
	});

	$('.prev-step').click(function(e){
		e.preventDefault();
		console.log("PREV");
		$('.slider').slickPrev();
	});
});


