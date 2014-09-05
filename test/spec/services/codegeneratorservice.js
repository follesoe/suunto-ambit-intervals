'use strict';

describe('Service: codeGeneratorService', function () {

  // load the service's module
  beforeEach(module('ambitIntervalsApp'));

  // instantiate service
  var codeGeneratorService;
  beforeEach(inject(function (_codeGeneratorService_) {
    codeGeneratorService = _codeGeneratorService_;
  }));

  it('should do something', function () {
    expect(!!codeGeneratorService).toBe(true);
  });

});
