angular.module('worktime.controllers', [])

.controller('WorktimeCtrl', function($scope, $state, WorktimeListService){
  $scope.worktimes = {};
  // Perform the login action when the user submits the login form
  $scope.getLast5Days = function () {
      var account = window.sessionStorage.getItem('account');
      account = JSON.parse(account);
      var data = {id_user:account.id_user, datestart:"2017-05-14", dateend:"2017-05-18"}

      WorktimeListService.listLast5Days(data)
      .then(function (data) {
        $scope.worktimes = data.worktime;
        console.log(JSON.stringify($scope.worktimes));
      }, function (data) {
          //fail
      });
  }


})

//The Service for the list of flights
.service('WorktimeListService', function ($q, $http) {
    return {
        listLast5Days: function (userData) {
            var deferred = $q.defer(),
                promise = deferred.promise;

            $http({
                url: 'http://88.84.20.245/tempura/php/get_worktime.php',
                method: "POST",
                data: userData,
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    if (response.data.error.code === "000") {
                        //console.log("Users: " + JSON.stringify(response.data));
                        deferred.resolve(response.data);
                    }
                }, function (error) {
                    //console.log("Server Error on login: " + JSON.stringify(error));
                    deferred.reject(error);
                });

            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        },
    };
});
