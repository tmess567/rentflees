//import {FlowRouter} from 'meteor/kadira:flow-router';
/*
AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    defaultState: "signIn",
    enablePasswordChange: true,

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
      continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    
    // Hooks
    onLogoutHook: myLogoutFunc,
    onSubmitHook: mySubmitFunc,
    preSignUpHook: myPreSubmitFunc,
    postSignUpHook: myPostSubmitFunc,
});
*/
// Options
AccountsTemplates.configure({
  defaultLayout: 'masterLayout',
  defaultLayoutRegions: {
    nav: 'nav',
    footer: 'footer',
  },
  defaultContentRegion: 'main',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,

  // sendVerificationEmail: true,
  // enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  //displayFormLabels: true,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  //homeRoutePath: '/',
  //showAddRemoveServices: false,
  //showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',
});


//FOR VERIFICATION EMAIL

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      console.log(userId);
      return Accounts.sendVerificationEmail( userId );
    } else {
      console.log("Problem here");
    }
  }
});

//AccountsTemplates.configureRoute('signOut');

//Fields Added
AccountsTemplates.addField({
    _id: "role",
    type: "radio",
    displayName: "Role",
    required: true,
    select: [
        {
        text: "Owner",
        value: "owner",
      }, {
        text: "Tenant",
        value: "tenant",
      },
    ],
});

AccountsTemplates.addField({
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    //minLength: 5,
});
AccountsTemplates.addField({
    _id: "nameVal",
    type: "text",
    displayName: "nameVal",
    required: true,
    //minLength: 5,
});

AccountsTemplates.removeField('email');
AccountsTemplates.addField({
    _id: 'email',
    type: 'email',
    required: true,
    displayName: "email",
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email',
});

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    //Enable for strong passwords
    //re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    //errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
});
/*
var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // Successfully logged in
      $('#BetaSigninModal').on('hidden.bs.modal', function (e) {
      })
    }
  }
};

AccountsTemplates.configure({
    onSubmitHook: mySubmitFunc
});
*/