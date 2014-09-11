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
        try {
          return codeGeneratorService.generateDurationApp(input);
        } catch (error) {
          return 'Error: ' + error.message;
        }
      }
    };
  });
