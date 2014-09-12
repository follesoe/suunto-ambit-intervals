'use strict';

/**
 * @ngdoc directive
 * @name ambitIntervalsApp.directive:appoutput
 * @description
 * # appoutput
 */
angular.module('ambitIntervalsApp')
  .directive('appoutput', function () {
    return {
      restrict: 'E',
      scope: '@',
      templateUrl: '/views/appoutput.html',
      link: function postLink($scope, element) {

      }
    };
  });
