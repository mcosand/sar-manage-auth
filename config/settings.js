// expose our config directly to our application using module.exports
module.exports = {
  'siteRoot':  '/',
  'oidc' : {
    'authority'     : '',
    'clientID'      : '', // your App ID
    'clientSecret'  : '', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/callback',
  },
  'data' : {
    'username'      : '',
    'password'      : '',
    'database'      : '',
    'server'        : 'localhost'
  },
  'email' : {
    'from': '"Example User" <example@example.com>',
    'smtp': null,
    /* // nodemailer createTransport options, or null to output to console.  
    'smtp':  {
      'host': 'smtp.gmail.com',
      'port': 465,
      'secure': true, // use SSL
      'auth': {
          'user': 'user@gmail.com',
          'pass': 'pass'
      }
    }
    */ 
  }
};