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
    $('.login-btn').click(function(){
        $('.main-content').slickGoTo(1,false);
    });

    $('.signup-btn').click(function(){
        $('.main-content').slickGoTo(3,false);
    });

    $('#forget-pass-link').click(function(){
        $('.main-content').slickGoTo(2,false);
    });

    $('#forget-password .back').click(function(){
        $('.main-content').slickGoTo(1,false);
    });
    $('#email-login .back').click(function(){
        $('.main-content').slickGoTo(0,false);
    });
    $('#signup .back').click(function(){
        $('.main-content').slickGoTo(0,false);
    });

    $('#login-modal').one('shown.bs.modal',function(){
        console.log('login open');
        $('.main-content').slick({
            arrows: false,
            draggable: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    });
});