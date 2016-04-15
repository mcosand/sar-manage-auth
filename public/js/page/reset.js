angular.module('manageAccounts')
.controller('ResetController', ['$scope', function($scope) {
  var self = this;
  angular.extend($scope, {
    model: { username: null },
    doReset: function() {
      console.log('do reset for username ' + $scope.model.username);
    }
  });
}]);