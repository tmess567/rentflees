//for non registered users
var anonRoutes = FlowRouter.group({
  name: 'anon'
});

var userRoutes = FlowRouter.group({
  name: 'user',
  triggersEnter: [function(context, redirect) {
    if(Meteor.user() === null){
      console.log("Called without logging in");
      $("#login-modal").modal();
      redirect('/');
    }
  }],
});


anonRoutes.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "index", nav: "nav"});
  }
});

anonRoutes.route('/aboutHome', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "listing_info", nav: "nav"});
  }
});

anonRoutes.route('/rentingGuide', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "renting-guide", nav: "nav"});
  }
});

anonRoutes.route('/comingSoon', {
  action: function() {
    window.location = "http://landing.rentflees.com";
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
    BlazeLayout.render("mainLayout", {content: "listview", nav: "nav"});
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