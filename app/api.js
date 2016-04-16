var config = require('../config/settings')
var _ = require('underscore')
var express = require('express')
var accounts = require('./services/accounts')

module.exports = function(app) {
  var api = express.Router();
  
  api.get('/', function(req, res) {
    res.json({thing: "value"});
  });
  api.post('/reset/:username', function(req, res) {
    accounts.reset(req.params.username)
    .then(function(email) { res.json({success: true, result: email }) })
    .catch(function(err) { console.log(err); res.status(err.status).send(err.text); })
  })
  
  app.use(config.siteRoot + 'api', api);
};