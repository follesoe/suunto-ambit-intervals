'use strict';

describe('Service: preprocessor', function () {

  // load the service's module
  beforeEach(module('ambitIntervalsApp'));

  // instantiate service
  var preprocessor;
  beforeEach(inject(function (_preprocessor_) {
    preprocessor = _preprocessor_;
  }));

  it('should do something', function () {
    expect(!!preprocessor).toBe(true);
  });

});
