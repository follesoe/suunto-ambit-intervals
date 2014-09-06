'use strict';

/**
 * @ngdoc service
 * @name ambitIntervalsApp.codeGeneratorService
 * @description
 * # codeGeneratorService
 * Service in the ambitIntervalsApp.
 */
angular.module('ambitIntervalsApp')
  .service('codeGeneratorService', function codeGeneratorService() {

    var convertPaceToSeconds = function (input) {
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

      function convertStep (step) {
        if (step.target.type === 'Pace') {
          step.target.from = convertPace(step.target.from);
          step.target.to = convertPace(step.target.to);
        }
      }

      function loopSteps (steps) {
        for (var i = 0; i < steps.length; ++i) {
          if (input.steps[i].type === 'Repeat') {
            loopSteps(input.steps[i].steps);
          } else {
            convertStep(input.steps[i]);
          }
        }
      }

      loopSteps(input.steps);
      return input;
    };

    var flattenRepeats = function (input) {
      var output = JSON.parse(JSON.stringify(input));
      output.steps = [];

      for (var i = 0; i < input.steps.length; ++i) {
        if (input.steps[i].type === 'Repeat') {
          var repeatSteps = input.steps[i].steps;
          var repeatTimes = input.steps[i].times;

          for (var j = 0; j < repeatTimes; ++j) {
            for (var k = 0; k < repeatSteps.length; ++k) {
              var clonedStep = JSON.parse(JSON.stringify(repeatSteps[k]));
              output.steps.push(clonedStep);
            }
          }

        } else {
          output.steps.push(input.steps[i]);
        }
      }

      return output;
    };

    this.generateDurationApp = function (interval) {
      var input = JSON.parse(JSON.stringify(interval));
      input = flattenRepeats(input);
      input = convertPaceToSeconds(input);

      var output = '';

      output += '/* ' + input.name + '*/\r\n';
      if (input.description) {
        output += '/* ' + input.description + '*/\r\n';
      }
      output += '/* Interval set - duration application */\r\n';
      output += '/* Initialize variables */\r\n';
      output += 'if (SUUNTO_DURATION == 0) {\r\n';
      output += '  RESULT = 0;\r\n';
      output += '}\r\n\r\n';

      for (var i = 0; i < input.steps.length; ++i) {
        var lapNumber = i + 1;
        var step = input.steps[i];

        output += '/* Lap ' + lapNumber +' is ' + step.type + ' with duration type ' + step.duration.type + ' */\r\n';
        output += 'if (SUUNTO_LAP_NUMBER == ' + lapNumber + ') {\r\n';

        if (step.type === 'WarmUp') {
          output += '  prefix = \'wu\';\r\n';
          output += '  postfix = \'m\';\r\n';
          output += '  RESULT = SUUNTO_LAP_DISTANCE*1000;\r\n';
        }

        if (step.type === 'Interval' && step.duration.type === 'Distance') {
          output += '  prefix = \'int\';\r\n';
          output += '  postfix = \'m\';\r\n';
          output += '  RESULT = ' + (step.duration.value*1000) + ' - (SUUNTO_LAP_DISTANCE*1000);\r\n';
        }

        if (step.type === 'Recovery' && step.duration.type === 'Distance') {
          output += '  prefix = \'rec\';\r\n';
          output += '  postfix = \'m\';\r\n';
          output += '  RESULT = ' + (step.duration.value*1000) + ' - (SUUNTO_LAP_DISTANCE*1000);\r\n';
        }

        if (step.type === 'CoolDown') {
          output += '  prefix = \'cd\';\r\n';
          output += '  postfix = \'m\';\r\n';
          output += '  RESULT = SUUNTO_LAP_DISTANCE*1000;\r\n';
        }
        output += '}\r\n\r\n';
      }

      output += '/* Check if duration is reached, if so altert to notify runner */\r\n';
      output += 'if (RESULT < 0) {\r\n';
      output += '  RESULT = 0;\r\n';
      output += '  Suunto.alarmBeep();\r\n';
      output += '}\r\n';

      return output;
    };

    this.generateTargetApp = function (interval) {
      var input = interval;
      input = JSON.parse(JSON.stringify(input));
      input = flattenRepeats(input);
      input = convertPaceToSeconds(input);

      var output = '';

      output += '/* Interval set - target application */\r\n';
      output += '/* Initialize variables */\r\n';
      output += 'if (SUUNTO_DURATION == 0) {\r\n';
      output += '  ACTUALPACE = 0;\r\n';
      output += '  TARGETPACE = 0;\r\n';
      output += '  TARGETSEC = 0;\r\n';
      output += '  TARGETMIN = 0;\r\n';
      output += '  RESULT = 0;\r\n';
      output += '}\r\n\r\n';

      output += 'ACTUALPACE = SUUNTO_PACE*60;\r\n\r\n';

      for (var i = 0; i < input.steps.length; ++i) {
        var lapNumber = i + 1;
        var step = input.steps[i];

        output += '/* Lap ' + lapNumber +' is ' + step.type + ' with target type ' + step.target.type + ' */\r\n';
        output += 'if (SUUNTO_LAP_NUMBER == ' + lapNumber + ') {\r\n';

        if (step.target.type === 'None') {
          output += '  prefix = \'at\';\r\n';
          output += '  postfix = \'/km\';\r\n';
          output += '  TARGETPACE = ACTUALPACE;\r\n';
          output += '  TARGETSEC = Suunto.mod(TARGETPACE, 60);\r\n';
          output += '  TARGETMIN = (TARGETPACE - TARGETSEC) / 60;\r\n';
          output += '  RESULT = TARGETMIN + TARGETSEC/100;\r\n';
        }

        if (step.target.type === 'Pace') {
          output += '  prefix = \'to\';\r\n';
          output += '  postfix = \'/km\';\r\n';
          output += '  TARGETPACE = ' + step.target.to + ';\r\n';
          output += '  TARGETSEC = Suunto.mod(TARGETPACE, 60);\r\n';
          output += '  TARGETMIN = (TARGETPACE - TARGETSEC) / 60;\r\n';
          output += '  RESULT = TARGETMIN + TARGETSEC/100;\r\n';
        }

        output += '}\r\n\r\n';
      }

      return output;
    };
  });
