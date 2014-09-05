'use strict';

/**
 * @ngdoc directive
 * @name ambitIntervalsApp.directive:stepEditor
 * @description
 * # stepEditor
 */
angular.module('ambitIntervalsApp')
  .directive('stepEditor', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        step: '='
      },
      templateUrl: '/views/stepeditortemplate.html',
      link: function ($scope) {
        $scope.stepTypes = ['Other', 'WarmUp', 'Interval', 'Recovery', 'CoolDown'];
        $scope.durationTypes = ['Distance', 'Lap'];
        $scope.targetTypes = ['Pace', 'None'];
      }
    };
  });
