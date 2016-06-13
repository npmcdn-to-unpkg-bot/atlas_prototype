describe('The detail controller', function () {
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

        controller = $controller('DetailController', {
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

    it('sets the uri and isLoading variables on the scope based on the state', function () {
        var mockedState = {
                detail: {
                    uri: 'this/that/123/',
                    isLoading: false
                }
            },
            controller;

        spyOn(store, 'getState').and.returnValue(mockedState);

        controller = getController();

        expect(controller.uri).toBe('this/that/123/');
        expect(controller.isLoading).toBe(false);
    });

    it('doesn\'t break when detail is null', function () {
        var mockedState = {
                detail: null
            },
            controller;

        spyOn(store, 'getState').and.returnValue(mockedState);

        controller = getController();

        expect(controller.uri).toBeNull();
        expect(controller.isLoading).toBeNull();
    });
});