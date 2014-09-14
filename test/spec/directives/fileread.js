'use strict';

describe('Directive: fileread', function () {

  // load the directive's module
  beforeEach(module('ambitIntervalsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fileread></fileread>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fileread directive');
  }));
});
