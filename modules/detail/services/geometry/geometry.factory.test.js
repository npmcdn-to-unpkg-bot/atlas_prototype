describe('The geometry factory', function () {
    var $httpBackend,
        $q,
        $rootScope,
        geometry,
        fakeGeoJSON = {
            foo: 'bar',
            whatever: true
        },
        mockedData = {
            gPerceel: {
                url: 'http://www.api-root.nl/brk/object/NL.KAD.OnroerendeZaak.123456/',
                response: {
                    geometrie: fakeGeoJSON
                }
            },
            aPerceel: {
                url: 'http://www.api-root.nl/brk/object/NL.KAD.OnroerendeZaak.456789/',
                response: {
                    index_letter: 'A',
                    g_percelen: {
                        href: 'http://mocked-atlas-api.amsterdam.nl/brk/object/?a_percelen__id=NL.KAD.OnroerendeZaak.123456'
                    }
                }
            },
            gPercelen: {
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
                url: 'http://www.api-root.nl/bag/nummeraanduiding/123456/',
                response: {
                    type: 'Verbijlfsobject',
                    verbijlfsobject: 'http://mocked-atlas-api.amsterdam.nl/bag/verblijfsobject/03630000553603/'
                }
            },
            verbijlfsobject:{
                url: 'http://mocked-atlas-api.amsterdam.nl/bag/verblijfsobject/03630000553603/',
                response: {
                    geometrie: fakeGeoJSON
                }
            },
            nummeraanduidingLigplaats: {
                url: 'http://www.api-root.nl/bag/nummeraanduiding/123456/',
                response: {
                    type: 'Ligplaats',
                    ligplaats: 'http://mocked-atlas-api.amsterdam.nl/bag/ligplaats/03630001030154/'
                }
            },
            ligplaats:{
                url: 'http://mocked-atlas-api.amsterdam.nl/bag/ligplaats/03630001030154/',
                response: {
                    geometrie: fakeGeoJSON
                }
            },
            nummeraanduidingStandplaats: {
                url: 'http://www.api-root.nl/bag/nummeraanduiding/123456/',
                response: {
                    type: 'Standplaats',
                    standplaats: 'http://mocked-atlas-api.amsterdam.nl/bag/standplaats/03630000691674/'
                }
            },
            standplaats: {
                url: 'http://mocked-atlas-api.amsterdam.nl/bag/standplaats/03630000691674/',
                response: {
                    geometrie: fakeGeoJSON
                }
            },
            kadastraalSubject: {
                url: 'http://www.api-root.nl/brk/subject/NL.KAD.Persoon.123456/',
                response: {
                }
            }
        };

    beforeEach(function () {
        angular.mock.module('atlasDetail');

        angular.mock.inject(function (_$httpBackend_, _$q_, _$rootScope_, _geometry_) {
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            geometry = _geometry_;
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

    it('returns the GeoJSON of an URL', function () {
        var response;
        
        geometry.getGeoJSON(mockedData.gPerceel.url).then(function (data) {
            response = data;
        });

        $httpBackend.flush();

        expect(response).toEqual(fakeGeoJSON);
    });

    describe('when searching for the geometry of an A perceel', function () {
        it('returns the GeoJSON of the parent G perceel', function () {
            var response;

            geometry.getGeoJSON(mockedData.aPerceel.url).then(function (data) {
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

                geometry.getGeoJSON(mockedData.nummeraanduidingVerblijfsobject.url).then(function (data) {
                    response = data;
                });

                $httpBackend.flush();

                expect(response).toEqual(fakeGeoJSON);
            });

            it('should return the ligplaats geometry when the type of nummeraanduiding is Ligplaats', function () {
                var response;

                geometry.getGeoJSON(mockedData.nummeraanduidingLigplaats.url).then(function (data) {
                    response = data;
                });

                $httpBackend.flush();

                expect(response).toEqual(fakeGeoJSON);
            });

            it('should return the standplaats geometry when the type of nummeraanduiding is Standplaats', function(){
                var response;

                geometry.getGeoJSON(mockedData.nummeraanduidingStandplaats.url).then(function (data) {
                    response = data;
                });

                $httpBackend.flush();

                expect(response).toEqual(fakeGeoJSON);
            });

        });

    });

    it('will return null if there is no geometry available', function () {
        var response;

        geometry.getGeoJSON(mockedData.kadastraalSubject.url).then(function (data) {
            response = data;
        });

        $httpBackend.flush();

        expect(response).toBeNull();
    });
});
