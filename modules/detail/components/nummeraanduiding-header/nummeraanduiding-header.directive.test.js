describe('The dp-nummeraanduiding-header directive', function () {
  var $compile,
    $rootScope,
    verblijfsObjecten = {
      18: {
        status: {
          code: '18',
          omschrijving: 'Verblijfsobject gevormd'
        }
      },
      21: {
        status: {
          code: '21',
          omschrijving: 'Verblijfsobject in gebruik'
        }
      }
    };

  beforeEach(function () {
    angular.mock.module(
      'atlasDetail',
      'ngSanitize',
      function ($provide) {
        $provide.factory('dpStelselpediaHeaderDirective', function () {
          return {
          };
        });
      }
    );

    angular.mock.inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  function getDirective (verblijfsObjectStatus, isHoofdadres) {
    var directive,
      element,
      scope;

    element = document.createElement('dp-nummeraanduiding-header');
    element.setAttribute('heading', 'Maria Austriastraat 730');
    element.setAttribute('meta-data', 'metaData');
    element.setAttribute('verblijfsobject', 'verblijfsobject');
    element.setAttribute('hoofdadres', 'hoofdadres');

    scope = $rootScope.$new();
    scope.metaData = {};
    scope.verblijfsobject = verblijfsObjecten[verblijfsObjectStatus];
    scope.hoofdadres = isHoofdadres;

    directive = $compile(element)(scope);
    scope.$digest();

    return directive;
  }

  describe('it adds status badges', function () {
    it('adds a red badge if the status of the verblijfsobject is \'Verblijfsobject gevormd\'', function () {
      var directive;

      //Status 'Verblijfsobject in gebruik', don't show a badge
      directive = getDirective(21, true);
      expect(directive.find('.badge.badge--red').length).toBe(0);
      expect(directive.text()).not.toContain('Verblijfsobject in gebruik');

      //Status 'Verblijfsobject gevormd', show a badge
      directive = getDirective(18, true);
      expect(directive.find('.badge.badge--red').length).toBe(1);
      expect(directive.find('.badge.badge--red').text()).toBe('Verblijfsobject gevormd');
    });

    it('adds a blue badge if it\'s a nevenadres', function () {
      var directive;

      //Hoofdadres
      directive = getDirective(21, true);
      expect(directive.find('.badge.badge--blue').length).toBe(0);

      //Nevenadres
      directive = getDirective(21, false);
      expect(directive.find('.badge.badge--blue').length).toBe(1);
      expect(directive.find('.badge.badge--blue').text()).toBe('Dit is een nevenadres');
    });
  });

  it('loads the dp-stelselpedia-header directive', function () {
    var directive = getDirective(21, true);

    expect(directive.find('dp-stelselpedia-header').length).toBe(1);
    expect(directive.find('dp-stelselpedia-header').attr('heading')).toBe('Maria Austriastraat 730');
    expect(directive.find('dp-stelselpedia-header').attr('definition')).toBe('NUMMERAANDUIDING');
    expect(directive.find('dp-stelselpedia-header').attr('meta-data')).toBe('vm.metaData');
  });

  it('makes the header italic is the verblijfsobject status is \'Verblijfsobject gevormd\'', function () {
    var directive;

    //Status 'Verblijfsobject in gebruik', use a roman font
    directive = getDirective(21, true);
    expect(directive.find('dp-stelselpedia-header').attr('heading')).toBe('Maria Austriastraat 730');

    //Status 'Verblijfsobject gevormd', use an italic font
    directive = getDirective(18, true);
    expect(directive.find('dp-stelselpedia-header').attr('heading')).toBe('<em>Maria Austriastraat 730</em>');
  });
});
