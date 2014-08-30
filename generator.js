var generateDurationApp = function (input) {
  var output = "";

  output += "/* Initialize variables */\r\n";
  output += "if (SUUNTO_DURATION == 0) {\r\n";
  output += "  TARGET = 0;\r\n";
  output += "  RESULT = 0;\r\n";
  output += "}\r\n\r\n";

  for (var i = 0; i < input.steps.length; ++i) {
    var lapNumber = i + 1;
    var step = input.steps[i];

    output += "/* Lap " + lapNumber +" is " + step.type + " with duration type " + step.duration.type + " */\r\n"
    output += "if (SUUNTO_LAP_NUMBER == " + lapNumber + ") {\r\n";

    if (step.type === 'WarmUp') {
      output += "  prefix = \"wu\";\r\n";
      output += "  postfix = \"m\";\r\n";
      output += "  RESULT = SUUNTO_LAP_DISTANCE*1000;\r\n";
    }

    if (step.type === 'Interval' && step.duration.type === 'Distance') {
      output += "  prefix = \"int\";\r\n";
      output += "  postfix = \"m\";\r\n";
      output += "  RESULT = " + (step.duration.value*1000) + " - (SUUNTO_LAP_DISTANCE*1000);\r\n";
    }

    if (step.type === 'Recovery' && step.duration.type === 'Distance') {
      output += "  prefix = \"rec\";\r\n";
      output += "  postfix = \"m\";\r\n";
      output += "  RESULT = " + (step.duration.value*1000) + " - (SUUNTO_LAP_DISTANCE*1000);\r\n";
    }

    if (step.type === 'CoolDown') {
      output += "  prefix = \"cd\";\r\n";
      output += "  postfix = \"m\";\r\n";
      output += "  RESULT = SUUNTO_LAP_DISTANCE*1000;\r\n";
    }
    output += "}\r\n\r\n";
  }

  output += "/* Check if target is meet, if so altert to notify runner */\r\n";
  output += "if (RESULT < 0) {\r\n";
  output += "  RESULT = 0;\r\n";
  output += "  Suunto.alarmBeep();\r\n";
  output += "}\r\n";

  return output;
};

var generateTargetApp = function (input) {
  return "";
}

module.exports = {
  generateDurationApp: generateDurationApp,
  generateTargetApp: generateTargetApp
}
