describe('The dp-print-button directive', function () {
  var $compile,
    $rootScope,
    $window;

  beforeEach(function () {
    angular.mock.module('atlasHeader');

    angular.mock.inject(function (_$compile_, _$rootScope_, _$window_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $window = _$window_;
    });
  });

  function getDirective (html) {
    var directive,
      element,
      scope;

    element = document.createElement('dp-print-button');

    if (angular.isString(html)) {
      element.innerHTML = html;
    }

    scope = $rootScope.$new();
    directive = $compile(element)(scope);
    scope.$digest();

    return directive;
  }

  it('prints the page when clicking a button', function () {
    var directive;

    spyOn($window, 'print');

    directive = getDirective();
    directive.find('button').click();

    expect($window.print).toHaveBeenCalled();
  });

  it('transcludes stuff', function () {
    var directive,
      html;

    html = '<span class="some-class">Afdrukken</span>';
    directive = getDirective(html);

    expect(directive.find('button span').text()).toBe('Afdrukken');
    expect(directive.find('button span').attr('class')).toContain('some-class');
  });
});
