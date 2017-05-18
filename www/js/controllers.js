angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state) {

  $scope.check_rights = function (userLogin) {
    var account = window.sessionStorage.getItem('account');
    account = JSON.parse(account);
    if(account.admin == 1){
        window.alert(JSON.stringify(account));
    }else {
        $state.go('app.norights');
    }

  }
});
