Template.mainLayout.onRendered(function(){
	setTimeout(function() {
	    $("#loading").fadeOut(500, function() { $("#loading").remove(); });
	    $(".main-header").show();
	    $("body").css("padding-top", "50px");
	}, 500);
});