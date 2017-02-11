var benefitsPhrases = ["Zero Brokerage", "Verified tenants", "House Maintenance", "Monthly Audits Reports"];
var imgIndex = 1;
var imgIndexDep = new Tracker.Dependency();
var interval = null;

Template.benefits.helpers({
	phrases: function(){
		return benefitsPhrases;
	},
	index: function(){
		imgIndexDep.depend();
		setTimeout(function(){
			$(".benefits-img").fadeIn(600);
		}, 500);
		return imgIndex.toString();
	}
});

//Change image
Template.benefits.onRendered(function(){
	//Change image every 3 seconds
	interval = setInterval(function() {
		$(".benefits-img").fadeOut(600, function(){
			imgIndex = (imgIndex+1) % 4;
			imgIndexDep.changed();
		});
	}, 3000);

	$(".benefits-head").mouseenter(function(e){
		/* When user hovers, stop interval
		Image will now be dependent on user hovers */
		window.clearInterval(interval);

		let bgContainer = $(".benefits-img-container")[0];
		let phrase = e.target.innerHTML;
		let index = benefitsPhrases.indexOf(phrase);
		//To prevent unwanted fading of image without change
		if (imgIndex !== index){
			$(".benefits-img").fadeOut(600, function(){
				imgIndex = index;
				imgIndexDep.changed();
			});
		}
	});	
});