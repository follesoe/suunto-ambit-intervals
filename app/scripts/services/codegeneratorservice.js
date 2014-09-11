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

    var createHeader = function (input, appType) {
      var output = '';
      output += '/* ' + appType + ' App */\r\n';
      output += '/* ' + input.name + ' */\r\n';

      if (input.description) {
        output += '/* ' + input.description + ' */\r\n';
      }

      output += '\r\n';
      return output;
    };

    var createVariableInitialization = function (variables) {
      var output = '';
      output += '/* Initialize variables */\r\n';
      output += 'if (SUUNTO_DURATION == 0) {\r\n';
      for (var i = 0; i < variables.length; ++i) {
        output += '  ' + variables[i] + ' = 0;\r\n';
      }
      output += '}\r\n\r\n';
      return output;
    };

    var createStepBodyForDuration = function (step) {
      var output = '';

      if (step.type === 'WarmUp') {
        output += '  prefix = "wu";\r\n';
      }

      if (step.type === 'CoolDown') {
        output += '  prefix = "cd";\r\n';
      }

      if (step.type === 'Interval') {
        output += '  prefix = "int";\r\n';
      }

      if (step.type === 'Recovery') {
        output += '  prefix = "rec";\r\n';
      }

      if (step.type === 'Rest') {
        output += '  prefix = "rest";\r\n';
      }

      if (step.type === 'Other') {
        output += '  prefix = "dist";\r\n';
      }

      if (step.duration.type === 'Lap') {
        output += '  postfix = "m";\r\n';
        output += '  RESULT = SUUNTO_LAP_DISTANCE*1000;\r\n';
      }

      if (step.duration.type === 'Distance') {
        output += '  postfix = "m";\r\n';
        output += '  RESULT = ' + (step.duration.value*1000) + ' - (SUUNTO_LAP_DISTANCE*1000);\r\n';
      } else if (step.duration.type === 'Time') {
        output += '  postfix = "s";\r\n';
        output += '  RESULT = ' + (step.duration.value) + ' - SUUNTO_LAP_DURATION;\r\n';
      }

      return output;
    };

    var createStepBodyForTarget = function (step) {
      var output = '';

      if (step.target.type === 'None') {
        output += '  prefix = "at";\r\n';
        output += '  postfix = "/km";\r\n';
        output += '  TARGETPACE = ACTUALPACE;\r\n';
        output += '  TARGETSEC = Suunto.mod(TARGETPACE, 60);\r\n';
        output += '  TARGETMIN = (TARGETPACE - TARGETSEC) / 60;\r\n';
        output += '  RESULT = TARGETMIN + TARGETSEC/100;\r\n';
      }

      if (step.target.type === 'Pace') {
        output += '  prefix = "to";\r\n';
        output += '  postfix = "/km";\r\n';
        output += '  TARGETPACE = ' + step.target.to + ';\r\n';
        output += '  TARGETSEC = Suunto.mod(TARGETPACE, 60);\r\n';
        output += '  TARGETMIN = (TARGETPACE - TARGETSEC) / 60;\r\n';
        output += '  RESULT = TARGETMIN + TARGETSEC/100;\r\n';
      }

      return output;
    };

    var createStepCommentForDuration = function (lapNumber, step) {
      return '/* Lap ' + lapNumber +' is step type ' + step.type + ' with duration type ' + step.duration.type + ' */\r\n';
    };

    var createStepCommentForTarget = function (lapNumber, step) {
      return '/* Lap ' + lapNumber +' is step type ' + step.type + ' with target type ' + step.target.type + ' */\r\n';
    };

    var createBody = function (input, commentFunction, stepFunction) {
      var output = '';
      var lapNumber = 0;
      for (var i = 0; i < input.steps.length; ++i) {
        lapNumber++;
        var step = input.steps[i];

        if (step.type === 'Repeat') {
          for (var j = 0; j < step.steps.length; ++j) {
            var ifCheck = [];
            var repeatLapNumbers = [];
            var repeatStep = step.steps[j];
            for (var k = 0; k < step.times; ++k) {
              var repeatLapNumber = lapNumber + j + (k * step.steps.length);
              repeatLapNumbers.push(repeatLapNumber);
              ifCheck.push('SUUNTO_LAP_NUMBER == ' + repeatLapNumber);
            }

            output += commentFunction(repeatLapNumbers.join(', '), repeatStep);
            output += 'if (' + ifCheck.join(' || ') + ') {\r\n';
            output += stepFunction(repeatStep);
            output += '}\r\n\r\n';
          }
          lapNumber += (step.times * step.steps.length) - 1;
        } else {
          output += commentFunction(lapNumber, step);
          output += 'if (SUUNTO_LAP_NUMBER == ' + lapNumber + ') {\r\n';
          output += stepFunction(step);
          output += '}\r\n\r\n';
        }
      }
      return output;
    };

    this.generateDurationApp = function (interval) {
      var input = JSON.parse(JSON.stringify(interval));
      input = convertPaceToSeconds(input);

      var output = '';

      output += createHeader(input, 'Duration');
      output += createVariableInitialization(['RESULT']);
      output += createBody(input, createStepCommentForDuration, createStepBodyForDuration);

      output += '/* Check if duration is reached and use alarm to notify to hit lap button */\r\n';
      output += 'if (RESULT < 0) {\r\n';
      output += '  RESULT = 0;\r\n';
      output += '  Suunto.alarmBeep();\r\n';
      output += '}\r\n';

      return output;
    };

    this.generateTargetApp = function (interval) {
      var input = interval;
      input = JSON.parse(JSON.stringify(input));
      input = convertPaceToSeconds(input);

      var output = '';
      output += createHeader(input, 'Target');
      output += createVariableInitialization(['ACTUALPACE', 'TARGETPACE', 'TARGETSEC', 'TARGETMIN', 'RESULT']);
      output += 'ACTUALPACE = SUUNTO_PACE*60;\r\n\r\n';
      output += createBody(input, createStepCommentForTarget, createStepBodyForTarget);
      return output;
    };
  });
