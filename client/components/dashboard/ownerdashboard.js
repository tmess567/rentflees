//Meteor.subscribe("tenantDir");
//Meteor.subscribe("currentUserData");
Meteor.subscribe("userList");
Template.dashboard.helpers({
    /*
    console.log(Users.find({ profile : {role : "tenant"} }) );
    return Users.find({ profile : {role : "tenant"} });
    */
    tenant : function() {
      //console.log(Meteor.users.find({_id: {$ne: Meteor.userId()}}, {profile: { role: 'tenant' } }));
        //return Meteor.users.find({_id: {$ne: Meteor.userId()}}, {profile: { role: 'tenant' } });
        //console.log(Meteor.users.find({}));
        return Meteor.users.find({profile : { role : 'tenant' } });
    },
    owner : function() {
      //console.log(Meteor.users.find({profile : { role : 'owner' } }));
      return Meteor.users.find({profile : { role : 'owner' } });
    }
  /*
  tenant() {
    return tenantDir.find({});
  }
  */
});