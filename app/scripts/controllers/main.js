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

    function createStep () {
      return {
        type: 'Other',
        duration: { type: 'Lap' },
        target: { type: 'None' }
      };
    }

    function initSelectedInterval () {
      if ($scope.intervals.length === 0) {
        var newInterval = createInterval('Interval 1');
        $scope.intervals.push(newInterval);
        $scope.interval = newInterval;
      } else {
        $scope.interval = $scope.intervals[0];
      }
    }

    function removeStepFrom (from, step) {
      if (step.type === 'Repeat' && step.steps.length > 2) {
        if (window.confirm('Do you really wan\'t to delete Repeat with ' + step.steps.length + ' steps?')) {
          _.remove(from, step);
        }
      } else {
        _.remove(from, step);
      }
    }

    $scope.interval = null;
    $scope.intervals = intervalFilesService.getIntervals();
    initSelectedInterval();

    $scope.$watch('interval', function (newValue) {
      intervalFilesService.saveInterval(newValue);
    }, true);

    $scope.addNewInterval = function () {
      var newInterval = createInterval('Interval ' + ($scope.intervals.length + 1));
      $scope.intervals.push(newInterval);
      $scope.interval = newInterval;
    };

    $scope.deleteInterval = function () {
      if (window.confirm('Do you really wan\'t to delete \'' + $scope.interval.name + '\'?')) {
        intervalFilesService.deleteInterval($scope.interval);
        var toRemove = $scope.interval;
        $scope.interval = null;
        _.remove($scope.intervals, toRemove);
        initSelectedInterval();
      }
    };

    $scope.deleteStep = function (step) {
      if (_.contains($scope.interval.steps, step)) {
        removeStepFrom($scope.interval.steps, step);
      } else {
        _($scope.interval.steps)
          .where(function (s) { return s.type === 'Repeat'; })
          .each(function (repeat) { removeStepFrom(repeat.steps, step); });
      }
    };

    $scope.addStepTo = function (step) {
      step.steps.push(createStep());
    };

    $scope.addStep = function () {
      $scope.interval.steps.push(createStep());
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
