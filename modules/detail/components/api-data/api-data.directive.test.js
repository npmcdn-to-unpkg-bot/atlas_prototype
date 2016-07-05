describe('The dp-api-data directive', function () {
  var $compile,
    $rootScope,
    $q,
    mockedData = {
      'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/': {
        'naam': 'Ik ben verblijfsobject #123',
        'buurt': {
          '_links': {
            'self': {
              'href': 'https://api-acc.datapunt.amsterdam.nl/gebieden/buurt/789/'
            }
          }
        }
      },
      'https://api-acc.datapunt.amsterdam.nl/gebieden/buurt/789/': {
        'naam': 'Ik ben buurt #789'
      }
    },
    triggerApi;

  beforeEach(function () {
    angular.mock.module('atlasDetail', {
      api: {
        getByUrl: function (url) {
          var q = $q.defer();

          if (triggerApi) {
            q.resolve(mockedData[url]);
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

    triggerApi = true;
  });

  function getDirective (url, localScope, template) {
    var directive,
      element,
      scope;

    element = document.createElement('atlas-api-data');
    element.setAttribute('url', url);
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
    directive = getDirective('https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/', 'vbo', template);

    expect(directive.find('h1').text()).toBe('Ik ben verblijfsobject #123');
  });

  it('can be nested into another atlas-api-data directive', function () {
    var directive,
      template;

    template = '<h1>{{vbo.naam}}</h1>' +
      '<atlas-api-data url="{{vbo.buurt._links.self.href}}" local-scope="buurt">' +
      '  <p>{{buurt.naam}}</p>' +
      '</atlas-api-data>';

    directive = getDirective('https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/', 'vbo', template);

    expect(directive.find('h1').text()).toBe('Ik ben verblijfsobject #123');
    expect(directive.find('p').text()).toBe('Ik ben buurt #789');
  });

  it('shows a loading indicator while waiting for the dataService', function () {
    var directive,
      template;

    triggerApi = false;

    template = '<h1>{{vbo.naam}}</h1>';
    directive = getDirective('https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/', 'vbo', template);

    expect(directive.find('i.fa.fa-spinner.fa-spin').length).toBe(1);
    expect(directive.text()).toContain('Bezig met laden...');
  });
});
