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
    BlazeLayout.render("mainLayout", {content: "index"});
  }
});


userRoutes.route('/addListing', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "add-listing"});
  }
});

anonRoutes.route('/map', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "mapview"});
  }
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');