Template.nav.events({
    'click div.sign-in': function(event)
    {
        event.preventDefault();
        Meteor.logout();
    }
});