var fs = require('fs');
var preprocessor = require('./preprocessor');
var generator = require('./generator');

if (process.argv.length < 4) {
  console.log('Usage: node ambitgenerator.js inputfile.json apptype');
  console.log('apptype must be either duration or target');
  return;
}

var file = process.argv[2];
var appType = process.argv[3];

if (!(appType === 'duration' || appType === 'target')) {
  console.log('apptype must be either duration or target');
  return;
}

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);
  data = preprocessor.flattenRepeats(data);

  if (appType === 'duration') {
    console.log(generator.generateDurationApp(data));
  } else {
    console.log(generator.generateTargetApp(data));  
  }

});
