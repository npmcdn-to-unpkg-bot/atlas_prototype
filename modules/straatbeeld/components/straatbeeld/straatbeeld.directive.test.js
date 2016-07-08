describe('The dp-straatbeeld directive', function () {
    var $compile,
        $rootScope,
        $q,
        store,
        ACTIONS,
        marzipanoService,
        earthmine,
        mockedMarzipanoViewer = 'I_AM_A_MOCKED_MARZIPANO_VIEWER',
        mockedEarthmineData = {
            id: 123,
            date: new Date(2016, 6, 8),
            camera: {
                location: [52.129, 4.790]
            },
            hotspots: ['FAKE_HOTSPOT_1', 'FAKE_HOTSPOT_2']
        };

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            {
                store: {
                    dispatch: function () {}
                },
                earthmine: {
                    getImageDataById: function () {
                        var q = $q.defer();

                        q.resolve(mockedEarthmineData);

                        return q.promise;
                    },
                    getImageDataByCoordinates: function () {
                        var q = $q.defer();

                        q.resolve(mockedEarthmineData);

                        return q.promise;
                    }
                }
            }
        );

        angular.mock.inject(
            function (_$compile_, _$rootScope_, _$q_, _store_, _ACTIONS_, _marzipanoService_, _earthmine_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $q = _$q_;
                store = _store_;
                ACTIONS = _ACTIONS_;
                marzipanoService = _marzipanoService_;
                earthmine = _earthmine_;
            }
        );

        spyOn(marzipanoService, 'initialize').and.returnValue(mockedMarzipanoViewer);
        spyOn(marzipanoService, 'loadScene');

        spyOn(earthmine, 'getImageDataById').and.callThrough();
        spyOn(earthmine, 'getImageDataByCoordinates').and.callThrough();

        spyOn(store, 'dispatch');
    });

    function getDirective (state) {
        var directive,
            element,
            scope;

        element = document.createElement('dp-straatbeeld');
        element.setAttribute('state', 'state');

        scope = $rootScope.$new();
        scope.state = state;

        directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('initializes the marzipanoService with the panoramaState', function () {
        var directive,
            container;

        directive = getDirective({id: 123});
        container = directive.find('.js-marzipano-viewer')[0];

        expect(marzipanoService.initialize).toHaveBeenCalledWith(container);
    });

    describe('loading data', function () {
        it('based on an ID', function () {
            getDirective({id: 123});

            expect(earthmine.getImageDataById).toHaveBeenCalledWith(123);
            expect(earthmine.getImageDataByCoordinates).not.toHaveBeenCalled();
        });

        it('based on coordinates', function () {
            getDirective({id: null, searchLocation: [52.123, 4.789]});

            expect(earthmine.getImageDataById).not.toHaveBeenCalled();
            expect(earthmine.getImageDataByCoordinates).toHaveBeenCalledWith(52.123, 4.789);
        });

        it('triggers SHOW_STRAATBEELD when the earthmineData is resvoled', function () {
            //For both searching by ID
            getDirective({id: 123});

            expect(store.dispatch).toHaveBeenCalledTimes(1);
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.SHOW_STRAATBEELD,
                payload: {
                    id: 123,
                    date: new Date(2016, 6, 8),
                    camera: {
                        location: [52.129, 4.790]
                    },
                    hotspots: ['FAKE_HOTSPOT_1', 'FAKE_HOTSPOT_2']
                }
            });

            //And searching by coordinates
            getDirective({id: null, searchLocation: [52.123, 4.789]});

            expect(store.dispatch).toHaveBeenCalledTimes(2);
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.SHOW_STRAATBEELD,
                payload: {
                    id: 123,
                    date: new Date(2016, 6, 8),
                    camera: {
                        location: [52.129, 4.790]
                    },
                    hotspots: ['FAKE_HOTSPOT_1', 'FAKE_HOTSPOT_2']
                }
            });
        });

        it('doesn\'t directly load a scene when earthmineData is resolved', function () {
            //Loading the scene should only be triggered by a Redux state change, not some internal API call
            getDirective({id: 123});

            expect(marzipanoService.loadScene).not.toHaveBeenCalled();
        });
    });

    it('loads a scene when there is a known camera location', function () {
        getDirective({
            id: 123,
            camera: {
                location: [52.123, 4.789]
            },
            hotspots: ['FAKE_HOTSPOT_X', 'FAKE_HOTSPOT_Y']
        });

        expect(marzipanoService.loadScene).toHaveBeenCalledWith(123, ['FAKE_HOTSPOT_X', 'FAKE_HOTSPOT_Y']);
    });
});
