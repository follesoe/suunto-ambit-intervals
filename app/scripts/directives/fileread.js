'use strict';

/**
 * @ngdoc directive
 * @name ambitIntervalsApp.directive:fileread
 * @description
 * # fileread
 */
angular.module('ambitIntervalsApp')
  .directive('fileread', [function () {
    return {
      scope: {
          fileread: '='
      },
      link: function (scope, element) {
        element.bind('change', function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          };
          reader.readAsText(changeEvent.target.files[0], 'UTF-8');
        });
      }
    };
  }]);
