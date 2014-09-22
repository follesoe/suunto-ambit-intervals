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
  .controller('MainCtrl', function ($scope, intervalFilesService, idgenerator, calculatorservice) {

    function createInterval (name) {
      return {
        name: name,
        id: idgenerator.getId(),
        description: '',
        defaultDurationType: 'Distance',
        defaultTargetType: 'Pace',
        durationAlarm: true,
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

    $scope.showImportExport = (window.webkitURL !== null);
    $scope.showFilePicker = false;
    $scope.interval = null;
    $scope.intervals = intervalFilesService.getIntervals();
    $scope.importFile = '';
    $scope.durationTypes = ['Distance', 'Time', 'Calories', 'HR'];
    $scope.targetTypes = ['Pace', 'Cadence', 'Speed', 'HR', 'Power'];

    $scope.durationAndDistance = {
      duration : 0,
      distance: 0
    };

    initSelectedInterval();

    $scope.$watch('interval', function (newValue) {
      intervalFilesService.saveInterval(newValue);
      $scope.durationAndDistance = calculatorservice.calculateInterval(newValue);
    }, true);

    $scope.$watch('importFile', function (newValue) {
      if (newValue && newValue.length > 0) {
        var importedInterval = JSON.parse(newValue);
        $scope.intervals.push(importedInterval);
        $scope.interval = importedInterval;
        $scope.showFilePicker = false;
      }
    });

    $scope.showLoadInterval = function () {
      $scope.showFilePicker = true;
    };

    $scope.hideLoadInterval = function () {
      $scope.showFilePicker = false;
    };

    $scope.exportInterval = function () {
      var textFileAsBlob = new Blob([angular.toJson($scope.interval, true)], {type:'text/plain'});
      var downloadLink = document.createElement('a');
      downloadLink.download = $scope.interval.name + '.txt';
      downloadLink.innerHTML = 'Download File';

      if (window.webkitURL !== null) {
    		// Chrome allows the link to be clicked without actually adding it to the DOM.
    		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    	}
      downloadLink.click();
    };

    $scope.addNewInterval = function () {
      var newInterval = createInterval('Interval ' + ($scope.intervals.length + 1));
      $scope.intervals.push(newInterval);
      $scope.interval = newInterval;
    };

    $scope.duplicateInterval = function () {
      var copy = _.cloneDeep($scope.interval);
      copy.name = copy.name + ' copy';
      copy.id = idgenerator.getId();
      $scope.intervals.push(copy);
      $scope.interval = copy;
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
