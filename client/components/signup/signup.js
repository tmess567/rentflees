Template.signupForm.events({
    'submit form': function(event){
        event.preventDefault();
        var name = $('[name=name]').val();
        var email = $('[name=email]').val();
        var password1 = $('[name=password1]').val();
        var password2 = $('[name=password2]').val();
        var role = $('[name=userrole]').val();
        
        Accounts.createUser({
            email: email,
            password: password
        });
    }
});