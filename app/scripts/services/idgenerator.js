'use strict';

/**
 * @ngdoc service
 * @name ambitIntervalsApp.idgenerator
 * @description
 * # idgenerator
 * Service in the ambitIntervalsApp.
 */
angular.module('ambitIntervalsApp')
  .service('idgenerator', function idgenerator() {
    this.getId = function () {
      return Math.round(Math.random(10) * 10000000000000000) + '';
    };
  });
