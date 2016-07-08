fdescribe('The dp-panorama directive', function () {
    var $compile,
        $rootScope,
        $q,
        store,
        ACTIONS,
        marzipanoService,
        earthmineService,
        mockedMarzipanoViewer = 'I_AM_A_MOCKED_MARZIPANO_VIEWER',
        mockedEarthmineData = {
            id: 123,
            camera: {
                location: [52.129, 4.790]
            }
        };

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            {
                store: {
                    dispatch: function () {}
                },
                earthmineService: {
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
            function (_$compile_, _$rootScope_, _$q_, _store_, _ACTIONS_, _marzipanoService_, _earthmineService_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $q = _$q_;
                store = _store_;
                ACTIONS = _ACTIONS_;
                marzipanoService = _marzipanoService_;
                earthmineService = _earthmineService_;
            }
        );

        spyOn(marzipanoService, 'initialize').and.returnValue(mockedMarzipanoViewer);
        spyOn(marzipanoService, 'loadScene');

        spyOn(earthmineService, 'getImageDataById').and.callThrough();
        spyOn(earthmineService, 'getImageDataByCoordinates').and.callThrough();

        spyOn(store, 'dispatch');
    });

    function getDirective (id, searchLocation, camera, isLoading) {
        var directive,
            element,
            scope;

        element = document.createElement('dp-straatbeeld');
        element.setAttribute('id', 'id');
        element.setAttribute('search-location', 'searchLocation');
        element.setAttribute('camera', 'camera');
        element.setAttribute('is-loading', 'isLoading');

        scope = $rootScope.$new();
        scope.id = id;
        scope.searchLocation = searchLocation;
        scope.camera = camera;
        scope.isLoading = isLoading;

        directive = $compile(element)(scope);
        scope.$apply();

        return directive;
    }

    it('initializes the marzipanoService with the panoramaState', function () {
        var directive,
            container;

        directive = getDirective(123);
        container = directive.find('.js-marzipano-viewer')[0];

        expect(marzipanoService.initialize).toHaveBeenCalledWith(container);
    });

    describe('loading data', function () {
        it('based on an ID', function () {
            getDirective(123, null);

            expect(earthmineService.getImageDataById).toHaveBeenCalledWith(123);
            expect(earthmineService.getImageDataByCoordinates).not.toHaveBeenCalled();
        });

        it('based on coordinates', function () {
            getDirective(null, [52.123, 4.789]);

            expect(earthmineService.getImageDataById).not.toHaveBeenCalled();
            expect(earthmineService.getImageDataByCoordinates).toHaveBeenCalledWith(52.123, 4.789);
        });

        it('triggers SHOW_STRAATBEELD when the earthmineData is resvoled', function () {
            //For both searching by ID
            getDirective(123, null);

            expect(store.dispatch).toHaveBeenCalledTimes(1);
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.SHOW_STRAATBEELD,
                payload: {
                    id: 123,
                    camera: {
                        location: [52.129, 4.790]
                    }
                }
            });

            //And searching by coordinates
            getDirective(null, [52.123, 4.789]);

            expect(store.dispatch).toHaveBeenCalledTimes(2);
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.SHOW_STRAATBEELD,
                payload: {
                    id: 123,
                    camera: {
                        location: [52.129, 4.790]
                    }
                }
            });
        });
    });

    it('loads a scene when the camera location changes', function () {

    });
});
