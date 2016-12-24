Template.mainLayout.onRendered(function(){
	window.onload = function() {
	    $("#loading").fadeOut(500, function() { $("#loading").remove(); });
	    $(".main-header").show();
	    $("body").css("padding-top", "50px");
	};
});