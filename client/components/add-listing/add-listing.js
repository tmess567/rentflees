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
      variableWidth: true,
      onBeforeChange: function(event, currentSlide, nextSlide){
        if(nextSlide > currentSlide)
          $("ul.form-progress > li:nth-child("+ (nextSlide+1) +")").addClass("active");
        else
          $("ul.form-progress > li:nth-child("+ (currentSlide+1) +")").removeClass("active");
      }
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

    $('#add-photo').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var files = $('#file').files;
        console.log(files);
        $('#file').click();
        if (files)
          console.log(files);
    });

    $("#file").change(function(){
        readURL(this);
    });
});

function readURL(input) {
    let count = $('#uploaded-image-carousel .slick-slide:not(.slick-cloned)').length;
    if (input.files) {
      console.log(input.files);
      for (let i = 0; i < input.files.length; i++) {
        let reader = new FileReader();
      reader.onload = function (e) {
        let img = document.createElement('img');
            $(img).attr('src', e.target.result);
            let dom = $('<div/>', {"class": "col-lg-3 col-md-3 col-sm-6 col-xs-12 no-padding", "tabindex": "0" }).append(img);
            let prompt_dom = $('#uploaded-image-carousel .slick-slide:last-child')
            $('#uploaded-image-carousel').slickRemove(count-1);
            $('#uploaded-image-carousel').slickAdd(dom[0]);
            $('#uploaded-image-carousel').slickAdd(prompt_dom[0]);
            count = $('#uploaded-image-carousel .slick-slide:not(.slick-cloned)').length;
            $('#uploaded-image-carousel').slickGoTo(count-1,false);
        };
        file = input.files[i];
        reader.readAsDataURL(file);
      }
    }
}

Meteor.subscribe('listings');
var imageName = [];
var latitude = 30.325558;
var longitude = 77.9470939;

Uploader.finished = function(index, fileInfo, templateContext) {
	//console.log(fileInfo.uploadedName);
	//console.log(Meteor.user().services.facebook.id);
	document.getElementById("uploadedImg").style.display = "block";
	document.getElementById("uploadedImg").src = '/upload/' + fileInfo.uploadedName;
	imageName.push(fileInfo.uploadedName);
  console.log(imageName);
}

AutoForm.hooks({
  addListingForm: {
  	onSubmit: function (insertDoc, updateDoc, currentDoc) {
  		this.event.preventDefault()
      // Inserting the coordinates
      insertDoc.XCoordinate = latitude;
      insertDoc.YCoordinate = longitude;
  		if(imageName.length !== 0){
  			insertDoc.image = imageName;
  			Listings.insert(insertDoc);
  			console.log("Done");
        alert("Listing added");
        Router.go('/');
  		} else {
        alert("Problem with Listing");
  			this.done(new Error("Submission failed"));
  		}
      //Listings.insert(insertDoc);
  		return true;
  	},
  }
 });

Template.addListing.helpers({
  isAdmin : function() { 
    console.log("checking admin");
    return Meteor.user().username === "Tushar Mishra";
  }
});

Template.addListing.events({
  "click #submit-listing" : function(evt) {
    let title = $("#listingTitle").val();
    let type = $("#listingType")[0].options[$("#listingType")[0].selectedIndex].innerText;
    let furnishing = $("#furnishing")[0].options[$("#furnishing")[0].selectedIndex].innerText;
//    let tenantPref = $('input[name=tenantPref]:checked').val();
    let occupation = $('input[name=occupation]:checked').val();
    let rent = $("#rent").val();
    let bhk = $("#bhk").val();
    let bathrooms = $("#bathrooms").val();
    let security = $("#security").val();
    
    let tenantPrefarr = [];
    let tenantPrefstr = "";
    $('input[name=tenantPref]:checked').each(function(){
      tenantPrefarr.push(this.value);
      tenantPrefstr += this.value + " ";
    });

    let foodarr = [];
    let foodstr = "";
    $('input[name=food]:checked').each(function(){
      foodarr.push(this.value);
      foodstr += this.value + " ";
    });

    let amenitiesstr = "";
    let amenities = [];
    $('input[name=amenities]:checked').each(function(){
      amenities.push(this.value);
      amenitiesstr += this.value + " ";
    });
    $('input[name=building-amenities]:checked').each(function(){
      amenities.push(this.value);
      amenitiesstr += this.value + " ";
    });
    
    let city = $("#cityListing")[0].options[$("#cityListing")[0].selectedIndex].innerText;

    let locality = $(".locality").val();
    let landmark = $(".landmark").val();
    let address = $(".address").val();

    let avail = $("#avail").val();

    let imageNameAddListing =  [];
    if(imageName.length !== 0){
        imageNameAddListing = [];
    } else {
      //show error
    }

    let score = 0;
    let verified = false;

    if (Meteor.user().username === "Tushar Mishra") {
      score = parseInt($('input[name=furnishingScore]').val())
        + parseInt($('input[name=locationScore]').val())
        + parseInt($('input[name=spaceScore]').val());
      verified = $('input[name=verified]').val() === "on";
    }

    Listings.insert({
      title: title,
      address: address,
      rent: rent,
      bhk: bhk,
      bathrooms: bathrooms,
      security: security,
      type: type,
      foodServices: foodarr,
      amenities: amenities,

      furnishing: furnishing,
      tenantPref: tenantPrefarr,
      occupation: occupation,
      city: city,
      locality: locality,
      landmark: landmark,

      XCoordinate: GoogleMaps.maps.map.instance.center.lat(),
      YCoordinate: GoogleMaps.maps.map.instance.center.lng(),

      score: score,
      verified: verified,
      image: imageName,

      author: Meteor.userId(),
      owner: Meteor.userId(),
      avail: avail,

      //To allow Easy search indexing
      foodstr: foodstr,
      amenitiesstr: amenitiesstr,
      tenantPrefstr: tenantPrefstr
    });
    
        alert("Listing added");
        Router.go('/');
  }
});
