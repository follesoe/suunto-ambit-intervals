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
    'ui.tree'
  ])
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
