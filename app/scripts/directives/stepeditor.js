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
        step: '=',
        deleteStep: '='
      },
      templateUrl: '/views/stepeditortemplate.html',
      link: function ($scope) {
        $scope.stepTypes = ['Other', 'WarmUp', 'Interval', 'Recovery', 'Rest', 'CoolDown'];
        $scope.durationTypes = ['Distance', 'Time', 'Lap'];
        $scope.targetTypes = ['Pace', 'Cadence', 'Speed', 'HR', 'None'];
      }
    };
  });
