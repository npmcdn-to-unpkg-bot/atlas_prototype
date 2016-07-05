xdescribe('The dp-wkpb-link directive', function () {
  var $compile,
    $rootScope,
    environment,
    mockedBrkObject;

  beforeEach(function () {
    //welke versie heb ik nodig?
    //a
    angular.mock.module('atlasDetail', function($provide){
      $provide.factory('dpLinkDirective', function(){
        return {};
      });
    });

    //b
    // angular.mock.module('atlasDetail', {
    //   dpLinkDirective: getLinkDirective
    // });

    // function getLinkDirective() {

    // }

    angular.mock.inject(function (_$compile_, _$rootScope_, _environment_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      environment = _environment_;
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

    element = document.createElement('atlas-wkpb-link');
    element.setAttribute('brk-object', 'brkObject');

    scope = $rootScope.$new();
    scope.brkObject = brkObject;

    directive = $compile(element)(scope);
    scope.$apply();

    return directive;
  }

  it('Creates a url to the object-wkpb detail page', function () {
    var directive;

    directive = getDirective(mockedBrkObject);

    //()
    //mock dp-link
  });
});
