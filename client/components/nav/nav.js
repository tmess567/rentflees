Template.nav.events({
    'click #sign-out': function(event) {
        event.preventDefault();
        Meteor.logout();
    }
});