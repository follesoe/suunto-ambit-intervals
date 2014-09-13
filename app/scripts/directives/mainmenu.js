'use strict';

/**
 * @ngdoc directive
 * @name ambitIntervalsApp.directive:mainmenu
 * @description
 * # mainmenu
 */
angular.module('ambitIntervalsApp')
  .directive('mainmenu', function ($location) {
    return {
      templateUrl: 'views/mainmenu.html',
      restrict: 'E',
      replace: true,
      scope: '@',
      link: function ($scope) {
        $scope.getClass = function(path) {
          return (path === $location.path()) ? 'active' : '';
        };
      }
    };
  });
