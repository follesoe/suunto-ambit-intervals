'use strict';

describe('Filter: sectopace', function () {

  // load the filter's module
  beforeEach(module('ambitIntervalsApp'));

  // initialize a new instance of the filter before each test
  var sectopace;
  beforeEach(inject(function ($filter) {
    sectopace = $filter('sectopace');
  }));

  it('should return the input prefixed with "sectopace filter:"', function () {
    var text = 'angularjs';
    expect(sectopace(text)).toBe('sectopace filter: ' + text);
  });

});
