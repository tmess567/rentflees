Template.loginForm.events({
    'submit form': function(event)
    {    	
		var print = document.getElementById('sign-in-msg');
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
        	if(error)
				print.innerHTML = error.reason;
				//console.log(error.reason);
		});

				print.innerHTML = "Login Successfull";
    }
});