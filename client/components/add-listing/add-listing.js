import {FlowRouter} from 'meteor/kadira:flow-router';

function setWidth(){
  var e = $("#photo");
  var width = 0;
  $("#photo .img-container").each(function (){
    $(this).load();
    width += $(this).width();
  });
  console.log(width);

  $("#photo .upload-photo-carousel").css('width', width + 'px');
  
  $(".upload-photo-div .left-control > i").click(function(){
    var cont = $("#photo .upload-photo-container");
    var carousel = $("#photo .upload-photo-carousel");
    var left = parseInt(carousel.css("left").replace(/[^-\d\.]/g, ''));
    console.log(carousel);
    var container_width = cont.width();
    var newLeft = left + container_width;
    console.log('oldLeft '+ left);
    console.log('newLeft '+ newLeft);
    if(newLeft <= 0){
      carousel.css("left",newLeft + "px");
    }
  });

  $(".upload-photo-div .right-control > i").click(function(){
    var cont = $("#photo .upload-photo-container");
    var carousel = $("#photo .upload-photo-carousel");
    var left = parseInt(carousel.css("left").replace(/[^-\d\.]/g, ''));
    console.log(carousel);
    var container_width = cont.width();
    var newLeft = left - container_width;
    console.log('oldLeft '+ left);
    console.log('newLeft '+ newLeft);
    if(-newLeft <= width){
      carousel.css("left", newLeft + "px");
    }
  });
}

Template.addListing.onRendered(function(){
  console.log('rendered');
});

Template.addListing.onCreated(function(){
  console.log('created' + $(this));
});

Template.addListing.events({
  "click fieldset[data-next] .next" : function(event) {
      event.preventDefault();
      var current_fs = $(event.target).closest('fieldset');
      var next_fs = $('#' + current_fs.attr("data-next"));
      if(next_fs != null){
        var form = current_fs.parent();
        console.log(current_fs);
        console.log(next_fs);
        var progress = form.find("ul.form-progress > li.active").last();
        progress.next("li").addClass("active");
        current_fs.removeClass("active");
        var flag = current_fs.attr("data-next") === 'photo';
        next_fs.addClass("active");
        if(flag){
          setWidth();
        }
      }
    },
  "click fieldset[data-prev] .prev" : function(event) {
    event.preventDefault();
    var current_fs = $(event.target).closest('fieldset');
    var prev_fs = $('#' + current_fs.attr("data-prev"));
    if(prev_fs != null){
      var form = current_fs.parent();
      console.log(current_fs);
      console.log(prev_fs);
      var progress = form.find("ul.form-progress > li.active").last();
      progress.removeClass("active");
      current_fs.removeClass("active");
      prev_fs.addClass("active");
    }
  },

});


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
