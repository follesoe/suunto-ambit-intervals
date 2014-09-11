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
        output += '  RESULT = SUUNTO_LAP_DISTANCE * 1000;\r\n';
      }

      if (step.duration.type === 'Distance') {
        if (!step.duration.value) {
          throw new Error('Duration distance missing for step of type ' + step.type);
        }

        output += '  postfix = "m";\r\n';
        output += '  RESULT = ' + (step.duration.value*1000) + ' - (SUUNTO_LAP_DISTANCE * 1000);\r\n';
      }

      if (step.duration.type === 'Time') {
        if (!step.duration.value) {
          throw new Error('Duration time missing for step ' + step.type);
        }

        output += '  postfix = "s";\r\n';
        output += '  RESULT = ' + (step.duration.value) + ' - SUUNTO_LAP_DURATION;\r\n';
      }

      return output;
    };

    var createStepBodyForTarget = function (step) {
      var output = '';

      if (step.target.type === 'None') {
        output += '  ACTUAL = SUUNTO_PACE * 60;\r\n';
        output += '  FROM = ACTUAL;\r\n';
        output += '  TO = ACTUAL;\r\n';
        output += '  FORMATPACE = 1;\r\n';
        output += '  postfix = "/km";\r\n';
      }

      if (step.target.type === 'Pace') {
        if (!step.target.to || !step.target.from) {
          throw new Error('Target pace missing for step ' + step.type);
        }
        output += '  ACTUAL = SUUNTO_PACE * 60;\r\n';
        output += '  FROM = ' + step.target.from + ';\r\n';
        output += '  TO = ' + step.target.to + ';\r\n';
        output += '  FORMATPACE = 1;\r\n';
        output += '  postfix = "/km";\r\n';
      }

      if (step.target.type === 'Cadence') {
        if (!step.target.to || !step.target.from) {
          throw new Error('Target cadence missing for step ' + step.type);
        }
        output += '  ACTUAL = SUUNTO_CADENCE;\r\n';
        output += '  FROM = ' + step.target.from + ';\r\n';
        output += '  TO = ' + step.target.to + ';\r\n';
        output += '  FORMATPACE = 0;\r\n\r\n';

        output += '  /* Check for cycling, mountain biking or indoor cycling */\r\n';
        output += '  if(SUUNTO_ACTIVITY_TYPE == 4 || SUUNTO_ACTIVITY_TYPE == 5 || SUUNTO_ACTIVITY_TYPE == 17) {\r\n';
        output += '    postfix = "rpm";\r\n';
        output += '  } else {\r\n';
        output += '    postfix = "spm";\r\n';
        output += '  }\r\n';
      }

      if (step.target.type === 'Speed') {
        if (!step.target.to || !step.target.from) {
          throw new Error('Target speed missing for step ' + step.type);
        }

        output += '  ACTUAL = SUUNTO_SPEED;\r\n';
        output += '  FROM = ' + step.target.from + ';\r\n';
        output += '  TO = ' + step.target.to + ';\r\n';
        output += '  FORMATPACE = 0;\r\n';
        output += '  postfix = "kmt";\r\n';
      }

      if (step.target.type === 'HR') {
        if (!step.target.to || !step.target.from) {
          throw new Error('Target Heart rate missing for step ' + step.type);
        }

        output += '  ACTUAL = SUUNTO_HR;\r\n';
        output += '  FROM = ' + step.target.from + ';\r\n';
        output += '  TO = ' + step.target.to + ';\r\n';
        output += '  FORMATPACE = 0;\r\n';
        output += '  postfix = "bpm";\r\n';
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

      output += '/* Notify if duration is reached */\r\n';
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
      output += createVariableInitialization(['ACTUAL', 'TO', 'FROM', 'FORMATPACE', 'TARGET', 'TARGETSEC', 'TARGETMIN', 'RESULT']);
      output += createBody(input, createStepCommentForTarget, createStepBodyForTarget);

      output += 'if (ACTUAL > TO) {\r\n';
      output += '  TARGET = TO;\r\n';
      output += '} else if (ACTUAL < FROM) {\r\n';
      output += '  TARGET = FROM;\r\n';
      output += '} else {\r\n';
      output += '  TARGET = ACTUAL;\r\n';
      output += '}\r\n\r\n';

      output += '/* Check if result should be formatted as pace and lables reversed */\r\n';
      output += 'if (FORMATPACE == 1) {\r\n';
      output += '  if (ACTUAL > TO) {\r\n';
      output += '    prefix ="up";\r\n';
      output += '  } else if (ACTUAL < FROM) {\r\n';
      output += '    prefix = "dwn";\r\n';
      output += '  } else {\r\n';
      output += '    prefix = "ok";\r\n';
      output += '  }\r\n\r\n';
      output += '  TARGETSEC = Suunto.mod(TARGET, 60);\r\n';
      output += '  TARGETMIN = (TARGET - TARGETSEC) / 60;\r\n';
      output += '  RESULT = TARGETMIN + TARGETSEC/100;\r\n';
      output += '} else {\r\n';
      output += '  if (ACTUAL > TO) {\r\n';
      output += '    prefix ="dwn";\r\n';
      output += '  } else if (ACTUAL < FROM) {\r\n';
      output += '    prefix = "up";\r\n';
      output += '  } else {\r\n';
      output += '    prefix = "ok";\r\n';
      output += '  }\r\n\r\n';
      output += '  RESULT = TARGET;\r\n';
      output += '}\r\n';

      return output;
    };
  });
