import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
//SimpleSchema.debug = true;
/*
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('listings');
});
*/
//AccountsTemplates.setState("signIn");
Template.nav.events({
    'click.sign-out': function(event)
    {
        event.preventDefault();
        Meteor.logout();
    }
});