describe('The map controller', function () {
    var $controller,
        $rootScope,
        store;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_$controller_, _$rootScope_, _store_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            store = _store_;
        });
    });

    function getController () {
        var controller,
            scope = $rootScope.$new();

        controller = $controller('MapController', {
            $scope: scope
        });

        scope.$apply();

        return controller;
    }

    it('subscribes to the store to listen for changes', function () {
        spyOn(store, 'subscribe').and.callThrough();

        getController();

        expect(store.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('sets the mapState based on the Redux state', function () {
        var mockedState = {
                map: {
                    var_1: 'a',
                    var_2: 'b'
                }
            },
            controller;

        spyOn(store, 'getState').and.returnValue(mockedState);

        controller = getController();

        expect(controller.mapState).toEqual({
            var_1: 'a',
            var_2: 'b'
        });
    });

    describe('optionally adds marker data for search by location and straatbeeld', function () {
        var mockedState,
            controller;

        it('can work without any markers', function () {
            mockedState = {};

            spyOn(store, 'getState').and.returnValue(mockedState);
            controller = getController();

            expect(controller.markers).toEqual({});
        });

        it('supports a search marker', function () {
            mockedState = {
                search: {
                    location: [52.1, 4.1]
                }
            };

            spyOn(store, 'getState').and.returnValue(mockedState);
            controller = getController();

            expect(controller.markers).toEqual({
                search: {
                    location: [52.1, 4.1]
                }
            });
        });

        it('supports a straatbeeld marker', function () {
            mockedState = {
                straatbeeld: {
                    camera: {
                        location: [52.2, 4.2]
                    }
                }
            };

            spyOn(store, 'getState').and.returnValue(mockedState);
            controller = getController();

            expect(controller.markers).toEqual({
                straatbeeld: {
                    location: [52.2, 4.2]
                }
            });
        });

        it('can have a search and straatbeeld marker at the same time', function () {
            //If the application logic won't allow this scenario; resolve this in the reducer(s), not here.
            mockedState = {
                search: {
                    location: [52.1, 4.1]
                },
                straatbeeld: {
                    camera: {
                        location: [52.2, 4.2]
                    }
                }
            };

            spyOn(store, 'getState').and.returnValue(mockedState);
            controller = getController();

            expect(controller.markers).toEqual({
                search: {
                    location: [52.1, 4.1]
                },
                straatbeeld: {
                    location: [52.2, 4.2]
                }
            });
        });
    });
});