// load all the things we need
var OIDCStrategy = require('passport-openidconnect').Strategy;

// load up the user model
///var User       = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // =========================================================================
  // OpenID Connect ==========================================================
  // =========================================================================
  passport.use('oidc', new OIDCStrategy({

      // pull in our app id and secret from our auth.js file
      clientID        : configAuth.oidc.clientID,
      clientSecret    : configAuth.oidc.clientSecret,
      callbackURL     : configAuth.oidc.callbackURL,
      authorizationURL: configAuth.oidc.authority + '/connect/authorize',
      tokenURL: configAuth.oidc.authority + '/connect/token',
      userInfoURL: configAuth.oidc.authority + '/connect/userinfo',
      ignoreCertificateErrors: true
  },

  function(iss, sub, profile, accessToken, refreshToken, done) {
      return done(null, { first: profile.name.givenName, memberId: profile._json.memberId });
  }));
};