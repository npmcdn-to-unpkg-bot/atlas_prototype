describe('The feedback-link directive', function () {
  'use strict';

  var $compile,
    $rootScope,
    $window,
    $location,
    currentUrl = 'http://www.example.com/path/filename.html?foo=bar#baz';

  beforeEach(function () {
    angular.mock.module('atlasHeader');

    angular.mock.inject(function (_$compile_, _$rootScope_, _$location_, _$window_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $location = _$location_;
      $window = _$window_;
    });

    spyOn($location, 'absUrl').and.returnValue(currentUrl);
  });

  function getDirective (transcludeStr) {
    var directive,
      element,
      scope;

    element = document.createElement('feedback-link');

    if (angular.isString(transcludeStr)) {
      element.innerHTML = transcludeStr;
    }

    scope = $rootScope.$new();
    directive = $compile(element)(scope);
    scope.$digest();

    return directive;
  }

  it('click event handling', function () {
    var directive = getDirective();
    var controller = directive.controller('feedbackLink');

    spyOn(controller, 'openMail');
    directive.triggerHandler('click');
    expect(controller.openMail).toHaveBeenCalled();
  });

  it('has transclude enabled', function () {
    var htmlStr = '<p id="unit-test-selector">This will be transcluded!</p>';

    expect(getDirective(htmlStr).find('p[id="unit-test-selector"]').text()).toBe('This will be transcluded!');
  });
});
