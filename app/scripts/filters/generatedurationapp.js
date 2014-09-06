'use strict';

/**
 * @ngdoc filter
 * @name ambitIntervalsApp.filter:generateDurationApp
 * @function
 * @description
 * # generateDurationApp
 * Filter in the ambitIntervalsApp.
 */
angular.module('ambitIntervalsApp')
  .filter('generateDurationApp', function (codeGeneratorService) {
    return function (input) {
      if (input) {
        return codeGeneratorService.generateDurationApp(input);
      }
    };
  });
