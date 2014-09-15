'use strict';

/**
 * @ngdoc filter
 * @name ambitIntervalsApp.filter:sectopace
 * @function
 * @description
 * # sectopace
 * Filter in the ambitIntervalsApp.
 */
angular.module('ambitIntervalsApp')
  .filter('sectopace', function () {

    function pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    return function (sec) {
      var hours = Math.floor(sec / 3600);
      var minutes = Math.floor((sec / 60) % 60);
      var seconds = Math.round(sec % 60);

      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return '--';
      }

      return '' + pad(hours, 2, '0') + ':' + pad(minutes, 2, '0') + ':' + pad(seconds, 2, '0');
    };
  });
