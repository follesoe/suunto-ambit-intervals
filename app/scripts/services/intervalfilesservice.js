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
      var filenames = localStorageService.keys();

      for (var i = 0; filenames.length > i; ++i) {
        files.push(this.getInterval(filenames[i]));
      }

      return files;
    };

    this.getInterval = function (name) {
      return localStorageService.get(name);
    };

    this.saveIntervals = function (intervals) {
      if (intervals) {
        localStorageService.clearAll();
        for (var i = 0; i < intervals.length; ++i) {
          localStorageService.set(intervals[i].name, JSON.stringify(intervals[i]));
        }
      }
    };

    this.deleteInterval = function (interval) {
      localStorageService.remove(interval.name);
    };
  });
