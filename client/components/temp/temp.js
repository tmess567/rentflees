Template.temp.helpers({
	//images:['home1.jpg' ,'home2.jpg','home3.jpg','home4.jpg','home5.jpg','home6.jpg','home7.jpg','home8.jpg','home9.jpg']
});

Template.temp.onRendered ( function() {
    $('#uploaded-image-carousel').slick({
      arrows: true,
      infinite: false,
      speed: 300,
	  slidesToShow: 4,
	  slidesToScroll: 4,
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
	  ]
    });

	$("#file").change(function(){
	    readURL(this);
	});
});

function readURL(input) {
    if (input.files ) {
    	for (let i = 0; i < input.files.length; i++) {
		    let reader = new FileReader();
			reader.onload = function (e) {
				let img = document.createElement('img');
		        $(img).attr('src', e.target.result);
		        let dom = $('<div/>', {"class": "col-md-3 col-sm-6 col-xs-12 no-padding" }).append(img);
		        $('#uploaded-image-carousel').slickAdd(dom[0]);
		        $('#uploaded-image-carousel').slickGoTo(-1,false);
		    };
		    file = input.files[i];
    		reader.readAsDataURL(file);
    	}
    }
}