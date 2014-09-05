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
  var output = {
    steps: []
  };

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
}

module.exports = {
  flattenRepeats: flattenRepeats,
  convertPaceToSeconds: convertPaceToSeconds
};
