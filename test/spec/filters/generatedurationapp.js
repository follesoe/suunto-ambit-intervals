'use strict';

describe('Filter: generateDurationApp', function () {

  // load the filter's module
  beforeEach(module('ambitIntervalsApp'));

  // initialize a new instance of the filter before each test
  var generateDurationApp;
  beforeEach(inject(function ($filter) {
    generateDurationApp = $filter('generateDurationApp');
  }));

  it('should return the input prefixed with "generateDurationApp filter:"', function () {
    var text = 'angularjs';
    expect(generateDurationApp(text)).toBe('generateDurationApp filter: ' + text);
  });

});
