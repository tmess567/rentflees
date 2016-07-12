//for non registered users
var anonRoutes = FlowRouter.group({
  name: 'anon'
});

var userRoutes = FlowRouter.group({
  name: 'user',
  triggersEnter: [function(context, redirect) {
    if(Meteor.user() === null){
      console.log("/addListing called without logging in");
      redirect('/');
    }
  }],
});


anonRoutes.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "listings"});
  }
});


userRoutes.route('/addListing', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "add-listing"});
  }
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');