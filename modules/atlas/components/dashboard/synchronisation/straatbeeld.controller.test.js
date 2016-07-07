describe('The straatbeeld controller', function () {
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

        controller = $controller('StraatbeeldController', {
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

    it('sets the query string based on the state', function () {
        var mockedState = {
                straatbeeld: {
                    id: 7,
                    location: null,
                    camera: {
                        heading: 1,
                        pitch: 2,
                        fov: 3
                    },
                    isLoading: false
                }
            },
            controller;

        spyOn(store, 'getState').and.returnValue(mockedState);

        controller = getController();

        expect(controller.id).toBe(7);

        expect(controller.camera).toEqual({
            heading: 1,
            pitch: 2,
            fov: 3
        });

        expect(controller.isLoading).toBe(false);
    });

    it('can have a location instead of an ID', function () {
        var mockedState = {
                straatbeeld: {
                    id: null,
                    location: [52.456, 4.321],
                    camera: {
                        heading: 1,
                        pitch: 2,
                        fov: 3
                    },
                    isLoading: false
                }
            },
            controller;

        spyOn(store, 'getState').and.returnValue(mockedState);

        controller = getController();

        expect(controller.id).toBeNull();
        expect(controller.location).toEqual([52.456, 4.321]);
    });

    it('doesn\'t break when straatbeeld is null', function () {
        var mockedState = {
                straatbeeld: null
            },
            controller;

        spyOn(store, 'getState').and.returnValue(mockedState);

        controller = getController();

        expect(controller.id).toBeNull();
        expect(controller.camera).toBeNull();
        expect(controller.isLoading).toBeNull();
    });
});