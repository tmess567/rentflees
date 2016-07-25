import {FlowRouter} from 'meteor/kadira:flow-router';

Template.addListing.onRendered ( function() {
    
    /*
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude); 
        console.log("Longitude: " + position.coords.longitude); 
    }

    */

    $('.slider').slick({
      arrows: false,
      draggable: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      onBeforeChange: function(event, currentSlide, nextSlide){
        console.log(currentSlide, nextSlide);
        if(nextSlide > currentSlide)
          $("ul.form-progress > li:nth-child("+ (nextSlide+1) +")").addClass("active");
        else
          $("ul.form-progress > li:nth-child("+ (currentSlide+1) +")").removeClass("active");
      }
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

    $('#uploaded-image-carousel').slick({
      arrows: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            arrows: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            arrows: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: true
          }
        }
      ]
    });
});

function readURL(input) {
    if (input.files ) {
      for (let i = 0; i < input.files.length; i++) {
        let reader = new FileReader();
      reader.onload = function (e) {
        let img = document.createElement('img');
            $(img).attr('src', e.target.result);
            let dom = $('<div/>', {"class": "col-lg-3 col-md-3 col-sm-6 col-xs-12 no-padding", "tabindex": "0" }).append(img);
            $('#uploaded-image-carousel').slickAdd(dom[0]);
            $('#uploaded-image-carousel').slickGoTo(-1,false);
        };
        file = input.files[i];
        reader.readAsDataURL(file);
      }
    }
}

Meteor.subscribe('listings');
var imageName = null;
var latitude = -37.8136;
var longitude = 144.9631;

Uploader.finished = function(index, fileInfo, templateContext) {
	//console.log(fileInfo.uploadedName);
	//console.log(Meteor.user().services.facebook.id);
	document.getElementById("uploadedImg").style.display = "block";
	document.getElementById("uploadedImg").src = '/upload/' + fileInfo.uploadedName;
	imageName = fileInfo.uploadedName;
}

AutoForm.hooks({
  addListingForm: {
  	onSubmit: function (insertDoc, updateDoc, currentDoc) {
  		this.event.preventDefault()
      // Inserting the coordinates
      insertDoc.XCoordinate = latitude;
      insertDoc.YCoordinate = longitude;
  		if(imageName != null){
  			insertDoc.image = imageName;
  			Listings.insert(insertDoc);
  			console.log("Done");
        //Router.go('/');
  		} else {
  			this.done(new Error("Submission failed"));
  		}
      //Listings.insert(insertDoc);
  		return true;
  	},
  },
 });


Template.mapAdd.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      console.log('Map Loaded');
      return {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 8
      }
    }
  }

});

Template.mapAdd.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    //previous key : AIzaSyBYV0r7tOHoNY0kKA14nyKxvAxhzZ3v8M8
    key: 'AIzaSyBiTVrSTOhuNSaxTT29FqS1bsa3OXHhulc',
    //'AIzaSyBGuxb2ewAPUA2TZScpgdXqKAiLYYEJ3fw', //places key for local testing
    //'AIzaSyBiTVrSTOhuNSaxTT29FqS1bsa3OXHhulc' //JS key

    libraries: 'geometry,places'
  });
  console.log("Map Rendered");
});

Template.mapAdd.onCreated(function() {
  var marker;
  GoogleMaps.ready('map', function(map) {
    console.log("Map Ready");
    marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude}, 
      map: map.instance, draggable: true, 
    });
    
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      if (places.length == 1){
        map.instance.panTo(places[0].geometry.location);
        marker.setPosition(places[0].geometry.location);
      }
    });

    google.maps.event.addListener(map.instance, 'click', function(event) {
      marker.setPosition(event.latLng);
      latitude = event.latLng.lat();
      longitude = event.latLng.lng();
    });
  });
});


  //document.getElementById("addListingForm").elements.namedItem("YCoordinate").value = "x";
