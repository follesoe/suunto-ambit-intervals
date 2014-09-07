'use strict';

describe('Controller: HowtoCtrl', function () {

  // load the controller's module
  beforeEach(module('ambitIntervalsApp'));

  var HowtoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HowtoCtrl = $controller('HowtoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
