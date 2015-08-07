'use strict';

describe('Directive: showStats', function () {

  // load the directive's module
  beforeEach(module('reactorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<show-stats></show-stats>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the showStats directive');
  }));
});