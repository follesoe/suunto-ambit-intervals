/*global _:false */
'use strict';

/**
 * @ngdoc function
 * @name ambitIntervalsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ambitIntervalsApp
 */
angular.module('ambitIntervalsApp')
  .controller('MainCtrl', function ($scope, intervalFilesService) {

    function createInterval (name) {
      return {
        name: name,
        description: '',
        steps: []
      };
    }

    $scope.interval = null;
    $scope.intervals = intervalFilesService.getIntervals();

    if ($scope.intervals.length === 0) {
      var newInterval = createInterval('Interval 1');
      $scope.intervals.push(newInterval);
      $scope.interval = newInterval;
    } else {
      $scope.interval = $scope.intervals[0];
    }

    $scope.addNewInterval = function () {
      var newInterval = createInterval('Interval ' + ($scope.intervals.length + 1));
      $scope.intervals.push(newInterval);
      $scope.interval = newInterval;
    };

    $scope.saveIntervals = function () {
      intervalFilesService.saveIntervals($scope.intervals);
    };

    $scope.deleteStep = function (step) {
      if (_.contains($scope.interval.steps, step)) {
        _.remove($scope.interval.steps, step);
      } else {
        _($scope.interval.steps)
          .where(function (s) { return s.type === 'Repeat'; })
          .each(function (repeat) { _.remove(repeat.steps, step); });
      }
    };

    $scope.addStep = function () {
      var newStep = {
        type: 'Other',
        duration: { type: 'Lap' },
        target: { type: 'None' }
      };

      $scope.interval.steps.push(newStep);
    };

    $scope.addRepeat = function () {
      var newRepeat = {
        type: 'Repeat',
        times: 1,
        steps: []
      };
      $scope.interval.steps.push(newRepeat);
    };

    $scope.options = {
      accept: function(sourceNode, destNode) {
        var data = sourceNode.$modelValue;
        var destType = destNode.$element.attr('data-nodetype');

        if (destType === 'Repeat' && data.type === 'Repeat') {
          return false;
        } else {
          return true;
        }
      }
    };
  });
