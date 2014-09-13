'use strict';

describe('Directive: dirDisqus', function () {

  // load the directive's module
  beforeEach(module('ambitIntervalsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dir-disqus></dir-disqus>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dirDisqus directive');
  }));
});
