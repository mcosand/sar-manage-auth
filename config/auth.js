// expose our config directly to our application using module.exports
module.exports = {
  'oidc' : {
    'authority'     : 'https://localhost:44300',
    'clientID'      : 'get_your_own', // your App ID
    'clientSecret'  : 'get_your_own', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/callback',
  }
};