Template.nav.events({
    'click div.sign-out': function(event)
    {
        event.preventDefault();
        Meteor.logout();
    }
});