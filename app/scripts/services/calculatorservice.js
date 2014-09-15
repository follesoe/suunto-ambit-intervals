'use strict';

/**
 * @ngdoc service
 * @name ambitIntervalsApp.calculatorservice
 * @description
 * # calculatorservice
 * Service in the ambitIntervalsApp.
 */
angular.module('ambitIntervalsApp')
  .service('calculatorservice', function calculatorservice(preprocessor) {
    var calculateStep = function (step, times) {
      var duration = 0;
      var distance = 0;
      var defaultPace = 5*60; // Assume a pace of 05:00 min/km.

      if (step.duration.type === 'Time') {
        duration = Number(preprocessor.convertPace(step.duration.value));
        if (step.target.type === 'Pace') {
          distance = duration / preprocessor.convertPace(step.target.to);
        } else {
          distance = duration / defaultPace;
        }
      }
      else if (step.duration.type === 'Distance') {
        distance = step.duration.value;

        if (step.target.type === 'Pace') {
          var pace = preprocessor.convertPace(step.target.to);
          duration = pace * step.duration.value;
        } else {
          duration = distance * defaultPace;
        }
      }

      return {
        duration: duration * times,
        distance: distance * times
      };
    };

    this.calculateStep = calculateStep;

    this.calculateInterval = function (interval) {
      var totalDistance = 0;
      var totalDuration = 0;
      var durationDistance;

      for (var i = 0; i < interval.steps.length; ++i) {
        var step = interval.steps[i];
        if (step.type === 'Repeat') {
          for (var j = 0; j < step.steps.length; ++j) {
            durationDistance = calculateStep(step.steps[j], step.times);
            totalDistance += durationDistance.distance;
            totalDuration += durationDistance.duration;
          }
        } else {
          durationDistance = calculateStep(step, 1);
          totalDistance += durationDistance.distance;
          totalDuration += durationDistance.duration;
        }
      }

      return {
        duration: totalDuration,
        distance: totalDistance.toFixed(2)
      };
    };
  });
