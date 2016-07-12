Meteor.autorun(function () {
  if (Meteor.userId()) {
    console.log("logged in")
    $('#nav-btn-accounts').text("Logout");
    if(Meteor.user()){
        $('#welcome-text').text("Welcome, "+Meteor.user().username);
        console.log(Meteor.user().username);
    }
    if(document.getElementById('login-modal'))
        $('#login-modal').modal('hide');

  } else {
    console.log("logged out")
    $('#welcome-text').text("");
    $('#nav-btn-accounts').text("Sign In");
  }
});