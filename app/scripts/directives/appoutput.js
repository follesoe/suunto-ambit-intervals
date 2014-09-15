/* global: window, document */
'use strict';

/**
 * @ngdoc directive
 * @name ambitIntervalsApp.directive:appoutput
 * @description
 * # appoutput
 */
angular.module('ambitIntervalsApp')
  .directive('appoutput', function () {
    var selectNode = function (node) {
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNode(node);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    return {
      restrict: 'E',
      scope: '@',
      templateUrl: 'views/appoutput.html',
      link: function postLink($scope, element) {

        $scope.showDurationHelp = false;
        $scope.showTargetHelp = false;
        $scope.copyHelpText = (window.navigator.platform === 'MacIntel') ? 'Now press CMD+C to copy' : 'Now press Ctrl+C to copy';

        $scope.selectDurationApp = function () {
          $scope.showDurationHelp = true;
          $scope.showTargetHelp = false;
          selectNode(element.find('pre')[0]);
        };

        $scope.selectTargetApp = function () {
          $scope.showTargetHelp = true;
          $scope.showDurationHelp = false;
          selectNode(element.find('pre')[1]);
        };
      }
    };
  });
