
FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "listings"});
  }
});


FlowRouter.route('/addListing', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "addListing"});
  }
});

FlowRouter.route('/login', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "index"});
  }
});

FlowRouter.route('/map', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "mapview"});
  }
});

FlowRouter.route('/:templateName', {
  action(params, queryParams) {
    console.log(params.templateName);
    BlazeLayout.render("mainLayout", {content: params.templateName});
  }
});

//Useraccounts
/*
FlowRouter.route('/', {
  name: "home",
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', {
      nav: "nav",
      content: "listings",
    });
  }
});
*/
//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');