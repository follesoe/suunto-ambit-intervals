'use strict';

/**
 * @ngdoc service
 * @name ambitIntervalsApp.preprocessor
 * @description
 * # preprocessor
 * Service in the ambitIntervalsApp.
 */
angular.module('ambitIntervalsApp')
  .service('preprocessor', function preprocessor() {
    var regex = /(\d\d):(\d\d)/;

    function convertPace (pace) {
      var match = regex.exec(pace);
      if (match && match.length > 1) {
        var min = Number(match[1]);
        var sec = Number(match[2]);
        return (min*60 + sec).toString();
      } else {
        return pace;
      }
    }

    this.convertPace = convertPace;

    this.convertPaceToSeconds = function (input) {
      function convertStep (step) {
        if (step.target.type === 'Pace') {
          step.target.from = convertPace(step.target.from);
          step.target.to = convertPace(step.target.to);
        }

        if (step.duration.type === 'Time') {
          step.duration.value = convertPace(step.duration.value);
        }
      }

      function loopSteps (steps) {
        for (var i = 0; i < steps.length; ++i) {
          if (steps[i].type === 'Repeat') {
            loopSteps(steps[i].steps);
          } else {
            convertStep(steps[i]);
          }
        }
      }

      loopSteps(input.steps);
      return input;
    };
  });
