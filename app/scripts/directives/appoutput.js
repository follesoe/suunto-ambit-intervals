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
      templateUrl: '/views/appoutput.html',
      link: function postLink($scope, element) {

        $scope.selectDurationApp = function () {
          selectNode(element.find('pre')[0]);
        };

        $scope.selectTargetApp = function () {
          selectNode(element.find('pre')[1]);
        };
      }
    };
  });
