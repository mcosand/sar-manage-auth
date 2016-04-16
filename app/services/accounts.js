var Sequelize = require('sequelize');
var config = require('../../config/settings');
var crypto = require('crypto');
var Email = require('./email');

var sequelize = new Sequelize(config.data.database, config.data.username, config.data.password, {
  host: config.data.server,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var AccountRow = sequelize.define('accounts', {
  id: { type: Sequelize.UUID, primaryKey: true },
  username: { type: Sequelize.STRING },
  passwordHash: { type: Sequelize.STRING },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  memberId: { type: Sequelize.UUID },
  lockReason: { type: Sequelize.STRING },
  locked: { type: Sequelize.DATE },
  created: { type: Sequelize.DATE },
  lastLogin: { type: Sequelize.DATE },
  passwordDate: { type: Sequelize.DATE }
}, { timestamps: false, tableName: 'Accounts' });

function getRandomString(n, a) {
  var index = (Math.random() * (a.length - 1)).toFixed(0);
  return n > 0 ? a[index] + getRandomString(n - 1, a) : '';
};

function makeSalt() {
  return crypto.randomBytes(16).toString('base64');
}

function hashPassword(password, salt) {
  var passwordBuffer = new Buffer(password, 'ucs2');
  var saltBuffer = new Buffer(salt, 'base64');
  var combinedBuffer = new Buffer(saltBuffer.length + passwordBuffer.length);
  saltBuffer.copy(combinedBuffer, 0, 0, saltBuffer.length);
  passwordBuffer.copy(combinedBuffer, saltBuffer.length, 0, passwordBuffer.length);

  shasum = crypto.createHash('sha1');
  shasum.update(combinedBuffer);
  return salt + shasum.digest('base64');
}

function makePassword() {
  return getRandomString(10, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890_-");
}

var service = {
  reset: function reset(username) {
    console.log('resetting password for ' + username);
    
    var password = makePassword();
    var newHash = hashPassword(password, makeSalt());
    var toAddr = null;
    
    return new Promise(function(resolve, reject) {
      // Get account
      AccountRow.findAll({ where: { username: username } })
      // update the password and save it.
      .then(function(results) {
        if (results.length != 1) {
          reject({status: 400, text: "Can't reset this user"});
        } else {
          return results[0].set({passwordHash: newHash, passwordDate: new Date()}).save();
        }
      })
      // send the email
      .then(function(account) {
        var email = "New KCSARA password: " + password;
        toAddr = account.getDataValue('email');
        return Email.send(toAddr, 'KCSARA Password', email)
                    .then(function() { console.log('Password reset mail sent to ' + toAddr) })
   
      })
      .then(function() {
        var masked = toAddr.replace(/^(.{1,3})(.*)@(.*?)(.{1,2}\.[^\.]+)$/, function(whole,first,mask1, mask2, last) {
          return first + Array(mask1.length).join('*') + '@' + Array(mask2.length).join('*') + last
        }); 
        resolve(masked);
      })
      .catch(function(err) {
        console.log('caught error');
        console.log(err);
        reject({ status: 500, text: 'Server error' });
      })
    });
  }
}

module.exports = service;