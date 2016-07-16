Template.nav.onRendered(function(){
	$('.nav-open').click(function (event) {
		event.preventDefault();
		$('.mobile-nav-container').addClass("open");
	});
	$('.nav-close').click(function (event) {
		event.preventDefault();
		$('.mobile-nav-container').removeClass("open");
	});
});

Template.nav.events({
    'click div.sign-out': function(event)
    {
        event.preventDefault();
        Meteor.logout();
    }
});