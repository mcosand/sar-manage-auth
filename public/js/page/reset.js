angular.module('manageAccounts')
.controller('ResetController', ['$scope', '$http', function($scope, $http) {
  var self = this;
  angular.extend($scope, {
    model: { username: null },
    doReset: function() {
      $http({
        method: 'POST',
        url: window.appRoot + 'api/reset/' + $scope.model.username,
      }).then(function (resp) {
        alert('Password was reset and sent to ' + resp.data.result);
      }).catch(function(err) {
        alert('Aborted: ' + err.data);
      })
    }
  });
}]);