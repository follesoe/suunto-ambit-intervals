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
      return codeGeneratorService.generateTargetApp(input);
    };
  });
