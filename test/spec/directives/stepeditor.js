'use strict';

describe('Directive: stepEditor', function () {

  // load the directive's module
  beforeEach(module('ambitIntervalsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<step-editor></step-editor>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stepEditor directive');
  }));
});
