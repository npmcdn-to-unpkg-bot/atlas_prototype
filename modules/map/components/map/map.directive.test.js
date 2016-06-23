describe('The dp-map directive', function () {
    var $compile,
        $rootScope,
        L,
        layers,
        variableWidth,
        mockedMapState;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            {
                mapConfig: {
                    MAP_OPTIONS: {
                        doThisThing: false,
                        someVariable: 4
                    }
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _L_, _layers_, _variableWidth_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            L = _L_;
            layers = _layers_;
            variableWidth = _variableWidth_;
        });

        spyOn(L, 'map').and.returnValue('I_AM_A_FAKE_LEAFLET_MAP');

        spyOn(layers, 'setBaseLayer');
        spyOn(layers, 'addOverlay');
        spyOn(layers, 'removeOverlay');

        spyOn(variableWidth, 'initialize');

        mockedMapState = {
            baseLayer: 'topografie',
            overlays: [],
            viewCenter: [52.789, 4.123],
            zoom: 12
        };
    });

    function getDirective (mapState, markers) {
        var directive,
            element,
            scope;

        element = document.createElement('dp-map');
        element.setAttribute('map-state', 'mapState');
        element.setAttribute('markers', 'markers');

        scope = $rootScope.$new();
        scope.mapState = mapState;
        scope.markers = markers;

        directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('creates a Leaflet map with options based on both the map state and mapConfig', function () {
        var directive,
            element;

        directive = getDirective(mockedMapState, {});
        element = directive[0].querySelector('.js-leaflet-map');

        expect(L.map).toHaveBeenCalledWith(element, {
            center: [52.789, 4.123],
            zoom: 12,
            doThisThing: false,
            someVariable: 4
        });
    });

    describe('has a base layer which', function () {
        it('is set on initialization', function () {
            getDirective(mockedMapState, {});

            expect(layers.setBaseLayer).toHaveBeenCalledWith('I_AM_A_FAKE_LEAFLET_MAP', 'topografie');
        });

        it('changes when the mapState changes', function () {
            getDirective(mockedMapState, {});
            expect(layers.setBaseLayer).toHaveBeenCalledTimes(1);

            mockedMapState.baseLayer = 'luchtfoto_2015';
            $rootScope.$apply();

            expect(layers.setBaseLayer).toHaveBeenCalledTimes(2);
            expect(layers.setBaseLayer).toHaveBeenCalledWith('I_AM_A_FAKE_LEAFLET_MAP', 'luchtfoto_2015');
        });
    });

    describe('has overlays which', function () {
        it('can be added on initialization', function () {
            mockedMapState.overlays = ['some_overlay'];
            getDirective(mockedMapState, {});
            expect(layers.addOverlay).toHaveBeenCalledWith('I_AM_A_FAKE_LEAFLET_MAP', 'some_overlay');
        });

        it('can be added when the mapState changes', function () {
            getDirective(mockedMapState, {});
            expect(layers.addOverlay).not.toHaveBeenCalled();

            mockedMapState.overlays = ['some_overlay', 'some_other_overlay'];
            $rootScope.$apply();

            expect(layers.addOverlay).toHaveBeenCalledWith('I_AM_A_FAKE_LEAFLET_MAP', 'some_overlay');
            expect(layers.addOverlay).toHaveBeenCalledWith('I_AM_A_FAKE_LEAFLET_MAP', 'some_other_overlay');
        });

        it('can be removed when the mapState changes', function () {
            mockedMapState.overlays = ['some_overlay', 'some_other_overlay'];
            getDirective(mockedMapState, {});

            expect(layers.removeOverlay).not.toHaveBeenCalled();

            mockedMapState.overlays = [];
            $rootScope.$apply();

            expect(layers.removeOverlay).toHaveBeenCalledWith('I_AM_A_FAKE_LEAFLET_MAP', 'some_overlay');
            expect(layers.removeOverlay).toHaveBeenCalledWith('I_AM_A_FAKE_LEAFLET_MAP', 'some_other_overlay');
        });
    });

    it('initializes the variableWidth factory', function () {
        var directive,
            container;

        directive = getDirective(mockedMapState, {});
        container = directive[0].querySelector('.js-leaflet-map');

        expect(variableWidth.initialize).toHaveBeenCalledWith(container, 'I_AM_A_FAKE_LEAFLET_MAP');
    });
});