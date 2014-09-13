'use strict';

/**
 * @ngdoc overview
 * @name ambitIntervalsApp
 * @description
 * # ambitIntervalsApp
 *
 * Main module of the application.
 */
angular
  .module('ambitIntervalsApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.tree',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ambitInterval');
  }])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/howto', {
        templateUrl: 'views/howto.html',
        controller: 'HowtoCtrl'
      })
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'FeedbackCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
