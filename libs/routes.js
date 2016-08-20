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
    BlazeLayout.render("mainLayout", {content: "index", nav: "nav"});
  }
});


userRoutes.route('/addListing', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "list-your-house", nav: "nav"});
  }
});

userRoutes.route('/addListingForm', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "addListing", nav: "nav"});
  }
});

userRoutes.route('/dashboard', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "dashboard", nav: "dashnav"});
  }
});

anonRoutes.route('/map', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "mapview", nav: "nav"});
  }
});

anonRoutes.route('/listings', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "listings", nav: "nav"});
  }
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');