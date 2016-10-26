Template.signupForm.events({
    'submit form': function(event){
        var print = document.getElementById('signup-msg');
        print.innerHTML='';
        var user = {};
        event.preventDefault();
        user.username = $('[name=userName]').val();
        user.nameVal = $('[name=realName]').val();
        user.email = $('[name=emailSel]').val();
        user.password = $('[name=password1]').val();
        user.profile = {
            //role : $('[name=userrole]');
        };
        //role = $('[name=userrole]').value;
        role = $("input[type='radio'][name='userrole']:checked").val();
        if($('[name=password1]').val() == $('[name=password2]').val()){
            Meteor.call( "registerUser",user,role,function(err){
                if(err){
                    alert(err);
                }
                else{
                    $('#login-modal').modal('hide');
                    console.log("Signed up successfully.\n Please Check your email for verification code");

                    //Logging User in
                    Meteor.loginWithPassword(user.email, user.password, function(error){
                        if(error){
                            console.log("Problem logging in");
                        }
                        else{
                            Meteor.call( 'sendVerificationLink', ( error, response ) => {
                                if ( error ) {
                                  alert( error.reason );
                                } else {
                                  alert( 'Email Verification link sent' );
                                }
                            });
                        }
                    });
                }
            });
        }
        else
        {
            print.innerHTML="Passwords don't match, Try again !"
        }
        
        /*
        Accounts.createUser(
            {
                username: $('[name=realName]').val(),
                password: $('[name=password1]').val(),
                profile: {
                    role: $('[name=userrole]')            
                },
                email: $('[name=emailSel]').val()
            }
        );
        */
/*
        $('[name=realName]').val('');
        $('[name=email]').val('');
        $('[name=password1]').val('');
        */
        console.log('done');
    }
});