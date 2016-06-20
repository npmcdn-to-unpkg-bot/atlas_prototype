describe('The dp-plugin-detail-include directive', function () {
  'use strict';
  var pluginDetailService,
    $rootScope,
    $compile,
    fakeData = {
      'aantekeningen': [
        {
          '_display': 'Locatiegegevens ontleend aan Basisregistraties Adressen en Gebouwen'
        }, {
          '_display': 'Besluit op basis van Monumentenwet 1988',
          'opgelegd_door': {
          '_display': 'De Staat (Onderwijs, Cultuur en Wetenschappen)'
          }
        }
      ],
      'betrokken_bij': [
        {
          '_display': 'ASD05 G 08860 A 0001'
        }, {
          '_display': 'ASD05 G 08860 A 0002'
        }
      ]
    };

  beforeEach(function () {
    angular.mock.module(
      'atlasDetail'
    );

    angular.mock.inject(function (_pluginDetailService_, _$rootScope_, _$compile_) {
      pluginDetailService = _pluginDetailService_;
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });
  });

  function getGraphDirective(data, page) {
    var directive,
      scope;

    var html = document.createElement('dp-plugin-detail-include');
    html.setAttribute('data', 'data');
    if(page !== null) {
      html.setAttribute('page', page);
    }

    scope = $rootScope.$new();
    scope.data = data;

    directive = $compile(html)(scope);
    scope.$digest();

    //Resolve the promises with $apply()
    $rootScope.$apply();

    return directive;
  }

  describe('toont een andere templates afhankelijk van het page attribute', function(){

    it('aantekeningen template', function() {
      var directive = getGraphDirective(fakeData.aantekeningen, 'aantekening');

      expect(directive.find('li:nth-of-type(1)').text().trim())
        .toBe('Locatiegegevens ontleend aan Basisregistraties Adressen en Gebouwen');
      expect(directive.find('li:nth-of-type(2)').text().trim())
        .toBe('Besluit op basis van Monumentenwet 1988,' +
          ' opgelegd door De Staat (Onderwijs, Cultuur en Wetenschappen)');
    });

    it('default template', function() {
      var directive = getGraphDirective(fakeData.betrokken_bij, null);

      expect(directive.find('li:nth-of-type(1)').text().trim())
        .toBe('ASD05 G 08860 A 0001');
      expect(directive.find('li:nth-of-type(2)').text().trim())
        .toBe('ASD05 G 08860 A 0002');
    });

  });

});