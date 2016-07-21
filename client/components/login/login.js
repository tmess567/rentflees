Template.loginForm.onRendered(function(){
    $('.close-button').click(function(){
        $('#login-modal').modal('hide');
    });
});

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

Template.loginModal.onRendered(function(){
    $("#email-login .back").click(function(){
        $("#social-connect").addClass("center");
        $("#email-login").removeClass("center");
    });
    $("#forget-password .back").click(function(){
        $("#email-login").addClass("center");
        $("#email-login").removeClass("left");
    });
    $('#signup .back').click(function () {
        $('#social-connect').addClass('center');
        $('#signup').removeClass('center');
    });
    $('#social-connect .login-btn').click(function(){
        $('#social-connect').removeClass('center');
        $('#social-connect').addClass('left');
        $('#email-login').addClass('center');
    });
    $('#social-connect .signup-btn').click(function(){
        $('#social-connect').removeClass('center');
        $('#social-connect').addClass('left');
        $('#signup').addClass('center');
    });
});