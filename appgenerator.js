var fs = require('fs');
var file = __dirname + '/intervalsets/RW0314v2Week3-Hege.json';
var preprocessor = require('./preprocessor');
var generator = require('./generator');

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);
  data = preprocessor.flattenRepeats(data);

  console.dir(data);
	console.log(generator.generateDurationApp(data));
});
