describe('The dp-api-data directive', function () {
  var $compile,
    $rootScope,
    $q,
    mockedData = {
      'bag/verblijfsobject/123/': {
        naam: 'Ik ben verblijfsobject #123',
        'buurt': {
          '_links': {
            'self': {
              'href': 'gebieden/buurt/789/'
            }
          }
        }
      },
      'gebieden/buurt/789/': {
        naam: 'Ik ben buurt #789'
      }
    },
    triggerDataService;

  beforeEach(function () {
    angular.mock.module('atlasDetail', {
      dataService: {
        getApiData: function (uri) {
          var q = $q.defer();

          if (triggerDataService) {
            q.resolve(mockedData[uri]);
          }

          return q.promise;
        }
      }
    });

    angular.mock.inject(function (_$compile_, _$rootScope_, _$q_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    triggerDataService = true;
  });

  function getDirective (uri, localScope, template) {
    var directive,
      element,
      scope;

    element = document.createElement('dp-api-data');
    element.setAttribute('uri', uri);
    element.setAttribute('local-scope', localScope);
    element.innerHTML = template;

    scope = $rootScope.$new();

    directive = $compile(element)(scope);
    scope.$digest();

    return directive;
  }

  it('loads api data and makes it available on the scope', function () {
    var directive,
      template;

    template = '<h1>{{vbo.naam}}</h1>';
    directive = getDirective('bag/verblijfsobject/123/', 'vbo', template);

    expect(directive.find('h1').text()).toBe('Ik ben verblijfsobject #123');
  });

  it('can be nested into another dp-api-data directive', function () {
    var directive,
      template;

    template = '<h1>{{vbo.naam}}</h1>' +
      '<dp-api-data uri="{{vbo.buurt._links.self.href}}" local-scope="buurt">' +
      '  <p>{{buurt.naam}}</p>' +
      '</dp-api-data>';

    directive = getDirective('bag/verblijfsobject/123/', 'vbo', template);

    expect(directive.find('h1').text()).toBe('Ik ben verblijfsobject #123');
    expect(directive.find('p').text()).toBe('Ik ben buurt #789');
  });

  it('shows a loading indicator while waiting for the dataService', function () {
    var directive,
      template;

    triggerDataService = false;

    template = '<h1>{{vbo.naam}}</h1>';
    directive = getDirective('bag/verblijfsobject/123/', 'vbo', template);

    expect(directive.find('i.fa.fa-spinner.fa-spin').length).toBe(1);
    expect(directive.text()).toContain('Bezig met laden...');
  });
});
