// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'login.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'views/main.html'
        }
      }
    })
  .state('app.holidays', {
      url: '/holidays',
      views: {
        'menuContent': {
          templateUrl: 'views/holidays.html'
        }
      }
    })
  .state('app.personal', {
      url: '/personal',
      views: {
        'menuContent': {
          templateUrl: 'views/personal.html'
        }
      }
    })
  .state('app.report', {
      url: '/report',
      views: {
        'menuContent': {
          templateUrl: 'views/report.html'
        }
      }
    })
  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
