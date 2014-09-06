'use strict';

describe('Service: intervalFilesService', function () {

  // load the service's module
  beforeEach(module('ambitIntervalsApp'));

  // instantiate service
  var intervalFilesService;
  beforeEach(inject(function (_intervalFilesService_) {
    intervalFilesService = _intervalFilesService_;
  }));

  it('should do something', function () {
    expect(!!intervalFilesService).toBe(true);
  });

});
