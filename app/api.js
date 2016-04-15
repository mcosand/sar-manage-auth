var _ = require('underscore')
var express = require('express')
var accounts = require('./services/accounts')

module.exports = function(app) {
  var api = express.Router();
  
  api.get('/', function(req, res) {
    res.json({thing: "value"});
  });
  api.post('/reset/:username', function(req, res) {
    var result = accounts.reset(req.params.username);
    res.json({success: result});
  })
  
  app.use('/api', api);
};