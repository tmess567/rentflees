var lastScrollTop = 0;
$(document).on('scroll', function(){
    var currentScrollTop = $(this).scrollTop();
    if(currentScrollTop > lastScrollTop+5) {
    	$('nav').addClass('hide');
    }
    else if(currentScrollTop < lastScrollTop-5){
    	$('nav').removeClass('hide');
    }
    lastScrollTop = currentScrollTop;
});
Template.nav.helpers({
	btnContent: function(){
		if(this.isLoggedIn)
			return 'Hello, '+ this.username();
		else
			return 'Sign In';
	},
    isLoggedIn: function(){
    	if(Meteor.user)
    		return true;
    	return false;
    },
    username: function(){
    	return Meteor.user.username;
    }
});

Template.nav.events({
	'click #nav-btn-accounts': function(){
		if (Meteor.user() !== null) {
			//user is logged in sign Out 
			Meteor.logout();
			$('#nav-btn-accounts').text("Sign In");
		} else {
			//user not logged in open sign in modal
			$('#login-modal').modal();
		}
	}
});