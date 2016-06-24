describe('The layers factory', function () {
    var L,
        layers,
        mockedLeafletMap,
        hasLayer;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            {
                mapConfig: {
                    BASE_LAYER_OPTIONS: {
                        option_a: false,
                        option_b: 4
                    }
                }
            },
            function ($provide) {
                $provide.constant('BASE_LAYERS', [
                    {
                        slug: 'baselayer_a',
                        label: 'Base layer A',
                        urlTemplate: 'https://example.com/mocked-base-layer-a.png'
                    }, {
                        slug: 'baselayer_b',
                        label: 'Base layer B',
                        urlTemplate: 'https://example.com/mocked-base-layer-b.png'
                    }
                ]);
            }
        );

        angular.mock.inject(function (_L_, _layers_) {
            L = _L_;
            layers = _layers_;
        });

        mockedLeafletMap = {
            hasLayer: function () {
                return hasLayer;
            },
            addLayer: function () {},
            removeLayer: function () {}
        };

        hasLayer = false;

        spyOn(L, 'tileLayer').and.returnValue('FAKE_BASE_LAYER');

        spyOn(mockedLeafletMap, 'hasLayer').and.callThrough();
        spyOn(mockedLeafletMap, 'addLayer');
        spyOn(mockedLeafletMap, 'removeLayer');
    });

    describe('baseLayer', function () {
        it('can set a baseLayer', function () {
            layers.setBaseLayer(mockedLeafletMap, 'baselayer_a');

            expect(L.tileLayer).toHaveBeenCalledWith(
                'https://example.com/mocked-base-layer-a.png',
                {
                    option_a: false,
                    option_b: 4
                }
            );

            expect(mockedLeafletMap.addLayer).toHaveBeenCalledWith('FAKE_BASE_LAYER');
        });

        it('makes sure a maximum of one baseLayer is active at the same time', function () {
            layers.setBaseLayer(mockedLeafletMap, 'baselayer_a');
            expect(mockedLeafletMap.hasLayer).toHaveBeenCalledWith(undefined);

            hasLayer = true;

            layers.setBaseLayer(mockedLeafletMap, 'baselayer_b');
            expect(mockedLeafletMap.hasLayer).toHaveBeenCalledWith('FAKE_BASE_LAYER');
            expect(mockedLeafletMap.removeLayer).toHaveBeenCalledWith('FAKE_BASE_LAYER');

            expect(L.tileLayer).toHaveBeenCalledWith(
                'https://example.com/mocked-base-layer-b.png',
                {
                    option_a: false,
                    option_b: 4
                }
            );

            expect(mockedLeafletMap.addLayer).toHaveBeenCalledTimes(2);
            expect(mockedLeafletMap.addLayer).toHaveBeenCalledWith('FAKE_BASE_LAYER');
        });
    });

    describe('overlays', function () {
        it('can add an overlay', function () {

        });

        it('can remove an overlay', function () {

        });
    });
});