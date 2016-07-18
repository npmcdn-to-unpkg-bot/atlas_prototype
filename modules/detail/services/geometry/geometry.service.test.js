xdescribe('The geometry service', function () {
  var $httpBackend,
    $q,
    $rootScope,
    geometryService,
    fakeGeoJSON = {
      foo: 'bar',
      whatever: true
    },
    mockedData = {
      gPerceel: {
        uri: 'brk/object/NL.KAD.OnroerendeZaak.123456/',
        url: 'http://www.api-root.nl/brk/object/NL.KAD.OnroerendeZaak.123456/',
        response: {
          geometrie: fakeGeoJSON
        }
      },
      aPerceel: {
        uri: 'brk/object/NL.KAD.OnroerendeZaak.456789/',
        url: 'http://www.api-root.nl/brk/object/NL.KAD.OnroerendeZaak.456789/',
        response: {
          index_letter: 'A',
          g_percelen: {
            href: 'http://mocked-atlas-api.amsterdam.nl/brk/object/?a_percelen__id=NL.KAD.OnroerendeZaak.123456'
          }
        }
      },
      gPercelen: {
        uri: 'brk/object/?a_percelen__id=NL.KAD.OnroerendeZaak.123456',
        url: 'http://mocked-atlas-api.amsterdam.nl/brk/object/?a_percelen__id=NL.KAD.OnroerendeZaak.123456',
        response: {
          results: [{
            _links: {
              self: {
                href: 'http://mocked-atlas-api.amsterdam.nl/brk/object/NL.KAD.OnroerendeZaak.123456/'
              }
            }
          }]
        }
      },
      nummeraanduidingVerblijfsobject: {
        uri: 'bag/nummeraanduiding/123456/',
        url: 'http://www.api-root.nl/bag/nummeraanduiding/123456/',
        response: {
          type: 'Verbijlfsobject',
          verbijlfsobject: 'http://mocked-atlas-api.amsterdam.nl/bag/verblijfsobject/03630000553603/'
        }
      },
      verbijlfsobject:{
        uri: 'bag/verblijfsobject/03630000553603/',
        url: 'http://mocked-atlas-api.amsterdam.nl/bag/verblijfsobject/03630000553603/',
        response: {
          geometrie: fakeGeoJSON
        }
      },
      nummeraanduidingLigplaats: {
        uri: 'bag/nummeraanduiding/123456/',
        url: 'http://www.api-root.nl/bag/nummeraanduiding/123456/',
        response: {
          type: 'Ligplaats',
          ligplaats: 'http://mocked-atlas-api.amsterdam.nl/bag/ligplaats/03630001030154/'
        }
      },
      ligplaats:{
        uri: 'bag/ligplaats/03630001030154/',
        url: 'http://mocked-atlas-api.amsterdam.nl/bag/ligplaats/03630001030154/',
        response: {
          geometrie: fakeGeoJSON
        }
      },
      nummeraanduidingStandplaats: {
        uri: 'bag/nummeraanduiding/123456/',
        url: 'http://www.api-root.nl/bag/nummeraanduiding/123456/',
        response: {
          type: 'Standplaats',
          standplaats: 'http://mocked-atlas-api.amsterdam.nl/bag/standplaats/03630000691674/'
        }
      },
      standplaats: {
        uri: 'bag/standplaats/03630000691674/',
        url: 'http://mocked-atlas-api.amsterdam.nl/bag/standplaats/03630000691674/',
        response: {
          geometrie: fakeGeoJSON
        }
      },
      kadastraalSubject: {
        uri: 'brk/subject/NL.KAD.Persoon.123456/',
        url: 'http://www.api-root.nl/brk/subject/NL.KAD.Persoon.123456/',
        response: {
        }
      }
    };

  beforeEach(function () {
    angular.mock.module('atlasApp.kaart', {
      urls: {
        API_ROOT: 'http://www.api-root.nl/'
      },
      URIParser: {
        parseUri: function (uri) {
          if(uri === 'brk/object/NL.KAD.OnroerendeZaak.456789/') {
            return {
              dataset: 'brk',
              subject: 'object'
            };
          } else if (uri === 'bag/nummeraanduiding/123456/') {
            return {
              dataset: 'bag',
              subject: 'nummeraanduiding'
            };
          } else {
            return {};
          }
        }
      }
    });

    angular.mock.module('atlasApp.kaart', ['$provide', function ($provide) {
      $provide.constant('toaster', {
        pop: function(){}
      });
    }]);

    angular.mock.inject(function (_$httpBackend_, _$q_, _$rootScope_, _geometryService_) {
      $httpBackend = _$httpBackend_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      geometryService = _geometryService_;
    });

    $httpBackend.whenGET(mockedData.gPerceel.url).respond(mockedData.gPerceel.response);

    $httpBackend.whenGET(mockedData.aPerceel.url).respond(mockedData.aPerceel.response);
    $httpBackend.whenGET(mockedData.gPercelen.url).respond(mockedData.gPercelen.response);
    $httpBackend.whenGET('http://mocked-atlas-api.amsterdam.nl/brk/object/NL.KAD.OnroerendeZaak.123456/')
      .respond(mockedData.gPerceel.response);

    $httpBackend.whenGET(mockedData.nummeraanduidingVerblijfsobject.url)
      .respond(mockedData.nummeraanduidingVerblijfsobject.response);
    $httpBackend.whenGET(mockedData.verbijlfsobject.url)
      .respond(mockedData.verbijlfsobject.response);

    $httpBackend.whenGET(mockedData.nummeraanduidingLigplaats.url)
      .respond(mockedData.nummeraanduidingLigplaats.response);
    $httpBackend.whenGET(mockedData.ligplaats.url)
      .respond(mockedData.ligplaats.response);

    $httpBackend.whenGET(mockedData.nummeraanduidingStandplaats.url)
      .respond(mockedData.nummeraanduidingStandplaats.response);
    $httpBackend.whenGET(mockedData.standplaats.url)
      .respond(mockedData.standplaats.response);

    $httpBackend.whenGET(mockedData.kadastraalSubject.url).respond(mockedData.kadastraalSubject.response);

  });

  it('returns the GeoJSON of an URI', function () {
    var response;

    geometryService.getByUri(mockedData.gPerceel.uri).then(function (data) {
      response = data;
    });

    $httpBackend.flush();

    expect(response).toEqual(fakeGeoJSON);
  });

  describe('when searching for the geometry of an A perceel', function () {
    it('returns the GeoJSON of the parent G perceel', function () {
      var response;

      geometryService.getByUri(mockedData.aPerceel.uri).then(function (data) {
        response = data;
      });

      $httpBackend.flush();

      expect(response).toEqual(fakeGeoJSON);
    });
  });

  describe('when searching for the geometry of an nummeraanduiding', function () {
    describe('returns the GeoJSON of the parent adressseerbaar object', function(){

      it('should return the verbijlfsobject geometry when the type of nummeraanduidingis Verbijlfsobject', function(){
        var response;

        geometryService.getByUri(mockedData.nummeraanduidingVerblijfsobject.uri).then(function (data) {
          response = data;
        });

        $httpBackend.flush();

        expect(response).toEqual(fakeGeoJSON);
      });

      it('should return the ligplaats geometry when the type of nummeraanduidingis Ligplaats', function () {
        var response;

        geometryService.getByUri(mockedData.nummeraanduidingLigplaats.uri).then(function (data) {
          response = data;
        });

        $httpBackend.flush();

        expect(response).toEqual(fakeGeoJSON);
      });

      it('should return the standplaats geometry when the type of nummeraanduiding is Standplaats', function(){
        var response;

        geometryService.getByUri(mockedData.nummeraanduidingStandplaats.uri).then(function (data) {
          response = data;
        });

        $httpBackend.flush();

        expect(response).toEqual(fakeGeoJSON);
      });

    });

  });

  it('will return null if there is no geometry available', function () {
    var response;

    geometryService.getByUri(mockedData.kadastraalSubject.uri).then(function (data) {
      response = data;
    });

    $httpBackend.flush();

    expect(response).toBeNull();
  });
});
