'use strict';

/**
 * @ngdoc filter
 * @name ambitIntervalsApp.filter:generateTargetApp
 * @function
 * @description
 * # generateTargetApp
 * Filter in the ambitIntervalsApp.
 */
angular.module('ambitIntervalsApp')
  .filter('generateTargetApp', function (codeGeneratorService) {
    return function (input) {
      if (input) {
        try {
          return codeGeneratorService.generateTargetApp(input);
        } catch (error) {
          return 'Error: ' + error.message;
        }
      }
    };
  });
