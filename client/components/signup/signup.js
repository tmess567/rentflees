Template.signupForm.events({
    'submit form': function(event){
        var print = document.getElementById('signup-msg');
        print.innerHTML='';
        var user = {};
        event.preventDefault();
        user.username = $('[name=realName]').val();
        user.email = $('[name=emailSel]').val();
        user.password = $('[name=password1]').val();
        user.profile = {};
        if($('[name=password1]').val() == $('[name=password2]').val()){
            Meteor.call( "registerUser",user);
        }
        else
        {
            print.innerHTML="Passwords don't match, Try again !"
        }
/*
        $('[name=realName]').val('');
        $('[name=email]').val('');
        $('[name=password1]').val('');
        */
        console.log('done');
    }
});