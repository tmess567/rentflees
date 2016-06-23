FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "listings"});
  }
});
FlowRouter.route('/addListing', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "add-listing"});
  }
});

//Useraccounts


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');