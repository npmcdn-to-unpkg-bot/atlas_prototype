describe('The stateToUrl factory', function () {
    var $location,
        stateToUrl,
        mockedState;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_$location_, _stateToUrl_, _DEFAULT_STATE_) {
            $location = _$location_;
            stateToUrl = _stateToUrl_;
            mockedState = angular.copy(_DEFAULT_STATE_);
        });

        spyOn($location, 'search');
    });

    describe('Search', function () {
        it('can contain a query', function () {
            mockedState.search = {
                query: 'i_am_a_query',
                location: null
            };

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                zoek: 'i_am_a_query'
            }));
        });

        it('can contain a location', function () {
            mockedState.search = {
                query: null,
                location: [52.123, 4.789]
            };

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                zoek: '52.123,4.789'
            }));
        });

        it('can be omitted', function () {
            mockedState.search = null;

            stateToUrl.update(mockedState);

            expect($location.search).not.toHaveBeenCalledWith(jasmine.objectContaining({
                zoek: jasmine.any(String)
            }));
        });
    });

    describe('Map', function () {
        it('updates the location', function () {
            mockedState.map.viewCenter = [52.789, 4.123];

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                lat: '52.789',
                lon: '4.123'
            }));
        });

        it('updates the baseLayer', function () {
            mockedState.map.baseLayer = 'historische_luchtfoto_1825';

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                basiskaart: 'historische_luchtfoto_1825'
            }));
        });

        it('can contain one of more overlays', function () {
            //No overlays, no parameter
            mockedState.map.overlays = [];

            stateToUrl.update(mockedState);

            expect($location.search).not.toHaveBeenCalledWith(jasmine.objectContaining({
                lagen: jasmine.any(String)
            }));

            //One overlay
            mockedState.map.overlays = ['overlay_x'];

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                lagen: 'overlay_x'
            }));

            //Two overlays
            mockedState.map.overlays = ['overlay_x', 'overlay_y'];

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                lagen: 'overlay_x,overlay_y'
            }));
        });

        it('keeps track of the zoom level', function () {
            mockedState.map.zoom = 8;

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                zoom: '8'
            }));
        });

        it('can contain encoded GeoJSON for highlighting objects', function () {
            mockedState.map.highlight = 'MOCKED_GEOJSON';

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                selectie: 'MOCKED_GEOJSON'
            }));
        });
    });

    describe('Page', function () {
        it('can store the name of the page', function () {
            //No page, no parameter
            stateToUrl.update(mockedState);

            expect($location.search).not.toHaveBeenCalledWith(jasmine.objectContaining({
                pagina: jasmine.Any(String)
            }));


            //With a page
            mockedState.page = 'welkom';

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                pagina: 'welkom'
            }));
        });
    });

    describe('Detail', function () {
        it('can store the api endpoint of the detail page', function () {
            //No detail, no parameter
            stateToUrl.update(mockedState);

            expect($location.search).not.toHaveBeenCalledWith(jasmine.objectContaining({
                detail: jasmine.Any(String)
            }));


            //With a detail page
            mockedState.detail = {
                endpoint: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/'
            };

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                detail: 'https://api-acc.datapunt.amsterdam.nl/bag/verblijfsobject/123/'
            }));
        });
    });

    describe('Straatbeeld', function () {
        it('does nothing is there is no active straatbeeld', function () {
            stateToUrl.update(mockedState);

            expect($location.search).not.toHaveBeenCalledWith(jasmine.objectContaining({
                id: jasmine.Any(String)
            }));

            expect($location.search).not.toHaveBeenCalledWith(jasmine.objectContaining({
                plat: jasmine.Any(String),
                plon: jasmine.Any(String)
            }));
        });

        it('can set the straatbeeld id if it\'s known', function () {
            mockedState.straatbeeld = {
                id: 67890,
                searchLocation: null,
                camera: {
                    location: null
                }
            };

            stateToUrl.update(mockedState);

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                id: '67890'
            }));

            expect($location.search).not.toHaveBeenCalledWith(jasmine.objectContaining({
                plat: jasmine.any(String),
                plon: jasmine.any(String)
            }));
        });

        it('can set the straatbeelds searchLocation (plat & plon)', function () {
            mockedState.straatbeeld = {
                id: null,
                searchLocation: [52.852, 4.258],
                camera: {
                    location: null
                }
            };

            stateToUrl.update(mockedState);

            expect($location.search).not.toHaveBeenCalledWith(jasmine.objectContaining({
                id: jasmine.any(String)
            }));

            expect($location.search).toHaveBeenCalledWith(jasmine.objectContaining({
                plat: '52.852',
                plon: '4.258'
            }));
        });
    });
});