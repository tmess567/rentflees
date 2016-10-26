
Accounts.emailTemplates.siteName = "Rentflees";
Accounts.emailTemplates.from     = "Rentflees <support@rentflees.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Rentflees] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@rentflees.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};

process.env.MAIL_URL = "smtp://support%40rentflees.com:Gmail_123@sg2plcpnl0134.prod.sin2.secureserver.net:465";