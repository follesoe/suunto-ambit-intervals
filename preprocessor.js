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
	flattenRepeats: flattenRepeats
};
