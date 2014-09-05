'use strict';

describe('Filter: generateTargetApp', function () {

  // load the filter's module
  beforeEach(module('ambitIntervalsApp'));

  // initialize a new instance of the filter before each test
  var generateTargetApp;
  beforeEach(inject(function ($filter) {
    generateTargetApp = $filter('generateTargetApp');
  }));

  it('should return the input prefixed with "generateTargetApp filter:"', function () {
    var text = 'angularjs';
    expect(generateTargetApp(text)).toBe('generateTargetApp filter: ' + text);
  });

});
