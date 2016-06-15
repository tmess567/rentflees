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
