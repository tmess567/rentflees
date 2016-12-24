Template.nav.events({
    'click #sign-out': function(event) {
        event.preventDefault();
        Meteor.logout();
    }
});

Template.nav.helpers({
	displayPic: function(){
		return Meteor.user().services.google.picture;
	}
})