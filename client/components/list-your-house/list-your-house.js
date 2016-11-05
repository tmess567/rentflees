Template.listYourHouse.onRendered(function() {
	$("#initSchedule").on("click", function(){
		console.log("called");
		Meteor.call('sendScheduleSMS', ( error, response ) => {
			if ( error ) {
	          alert( error.reason );
	        } else {
	          //alert( 'Schedule sms sent.' );
	          window.location.href='/';
	        }
		});
	});
});