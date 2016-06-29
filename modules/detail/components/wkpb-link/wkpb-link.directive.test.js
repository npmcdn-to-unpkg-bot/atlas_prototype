xdescribe('The dp-wkpb-link directive', function () {
  var $compile,
    $rootScope,
    $state,
    $timeout,
    mockedBrkObject;

  beforeEach(function () {
    angular.mock.module('atlasDetail');

    angular.mock.inject(function (_$compile_, _$rootScope_, _$state_, _$timeout_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      $timeout = _$timeout_;
    });

    mockedBrkObject = {
      id: 'abcdef123',
      beperkingen: {
        count: 3
      }
    };
  });

  function getDirective (brkObject) {
    var directive,
      element,
      scope;

    element = document.createElement('dp-wkpb-link');
    element.setAttribute('brk-object', 'brkObject');

    scope = $rootScope.$new();
    scope.brkObject = brkObject;

    directive = $compile(element)(scope);
    scope.$apply();

    return directive;
  }

  it('Creates a link to the brk-object detail page', function () {
    var directive;

    spyOn($state, 'go');

    directive = getDirective(mockedBrkObject);

    directive.find('a').click();
    $timeout.flush();

    expect($state.go).toHaveBeenCalledWith('app.detail', {uri: 'brk/object-wkpb/abcdef123'}, jasmine.any(Object));
  });
});
