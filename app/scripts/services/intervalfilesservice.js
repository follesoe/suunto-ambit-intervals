'use strict';

/**
 * @ngdoc service
 * @name ambitIntervalsApp.intervalFilesService
 * @description
 * # intervalFilesService
 * Service in the ambitIntervalsApp.
 */
angular.module('ambitIntervalsApp')
  .service('intervalFilesService', function intervalFilesService(localStorageService) {
    this.getIntervals = function () {
      var files = [];
      var ids = localStorageService.keys();

      for (var i = 0; ids.length > i; ++i) {
        files.push(this.getInterval(ids[i]));
      }

      return files;
    };

    this.getInterval = function (id) {
      return localStorageService.get(id);
    };

    this.saveInterval = function (interval) {
      localStorageService.remove(interval.id);
      localStorageService.set(interval.id, interval);
    };

    this.deleteInterval = function (interval) {
      localStorageService.remove(interval.id);
    };
  });
