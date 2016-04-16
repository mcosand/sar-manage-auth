var config = require('../../config/settings');

var transporter = {
  sendMail: function(message) {
    return new Promise(function(resolve, reject) {
      console.log(message);
      resolve();
    })
   }
};
if (config.email.smtp) {
  var nodemailer = require('nodemailer');
  transporter = nodemailer.createTransport(config.email.smtp);
}

module.exports = {
  send: function(to, subject, text) {
    return transporter.sendMail({
        from: config.email.from,
        to: to,
        subject: subject,
        text: text
      })
  }
};