'use strict';

describe('Service: idgenerator', function () {

  // load the service's module
  beforeEach(module('ambitIntervalsApp'));

  // instantiate service
  var idgenerator;
  beforeEach(inject(function (_idgenerator_) {
    idgenerator = _idgenerator_;
  }));

  it('should do something', function () {
    expect(!!idgenerator).toBe(true);
  });

});
