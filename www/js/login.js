angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $state, LoginService, UserListService){
  // Form data for the login page
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function (userLogin) {
      LoginService.loginUser(userLogin)
      .then(function (data) {
          //log in successfull
          //window.alert("Login funktioniert");
          $state.go('app.main');
      }, function (data) {
          //log in failed
          var failureAlert = document.getElementById('login_failure_alert');
          failureAlert.innerHTML = "Passwort falsch";
          //window.alert("Passwort falsch");
      });
  }

  //Get all Flights from the database for the Main Page (Select Box)
  $scope.listAllUsers = function () {
      UserListService.listAll()
      .then(function (data) {
          $scope.createUserSelectBox(data.users);
      }, function (data) {
          //failed
      });
  }

  //Function for the Selectbox creation
  $scope.createUserSelectBox = function (data) {
      var selectBox = document.getElementById('user_list');

      data.forEach(function (entry) {
          // Create the list item
          var item = document.createElement('option');
          // Set its contents
          item.appendChild(document.createTextNode(entry));
          // Add it to the list
          selectBox.appendChild(item);
      })
      //$scope.compile(selectBox);
  }
})

//The Service for the Login
.service('LoginService', function ($q, $http) {
    return {
        loginUser: function (loginData) {
            var deferred = $q.defer(),
                promise = deferred.promise;

            $http({
                url: 'http://88.84.20.245/tempura/php/login.php',
                method: "POST",
                data: loginData,
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    if (response.data.error.code === "000") {
                        console.log("User login successful: " + JSON.stringify(response.data));
                        deferred.resolve(response.data);
                    } else {
                        console.log("User login failed: " + JSON.stringify(response.data.error));
                        deferred.reject(response.data);
                    }
                }, function (error) {
                    console.log("Server Error on login: " + JSON.stringify(error));
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
})

//The Service for the list of flights
.service('UserListService', function ($q, $http) {
    return {
        listAll: function (loginData) {
            var deferred = $q.defer(),
                promise = deferred.promise;

            $http({
                url: 'http://88.84.20.245/tempura/php/show_users.php',
                method: "POST",
                data: null,
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
