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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({ 
        redirectTo: '/'
      });
  });
