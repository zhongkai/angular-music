'use strict';

describe('Directive: rotateDirective', function () {

  // load the directive's module
  beforeEach(module('ugMusicApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rotate-directive></rotate-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rotateDirective directive');
  }));
});
