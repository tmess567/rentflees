Template.loginForm.events({
    'submit form': function(event)
    {
        print = document.getElementById('login-msg');
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error)
        {
        	if(error){
				print.innerHTML = error.reason;
			}
            else
			{
				$('#login-modal').modal('hide');
                console.log(Meteor.user());
			}
		});
    }
});