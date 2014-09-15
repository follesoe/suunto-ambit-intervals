'use strict';

describe('Service: calculatorservice', function () {

  // load the service's module
  beforeEach(module('ambitIntervalsApp'));

  // instantiate service
  var calculatorservice;
  beforeEach(inject(function (_calculatorservice_) {
    calculatorservice = _calculatorservice_;
  }));

  it('should do something', function () {
    expect(!!calculatorservice).toBe(true);
  });

});
