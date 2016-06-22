describe('The dp-link component', function () {
    var $compile,
        $rootScope,
        mockedStore;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            function ($provide) {
                $provide.constant('ACTIONS', {
                    ACTION_A: 'ACTION_A',
                    ACTION_Z: 'ACTION_Z'
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        mockedStore = {
            dispatch: function () {}
        };
    });

    function getComponent (store, type, payload) {
        var component,
            element,
            scope;

        element = document.createElement('dp-link');
        element.setAttribute('store', 'store');
        element.setAttribute('type', type);
        element.setAttribute('payload', 'payload');

        scope = $rootScope.$new();
        scope.store = store;
        scope.payload = payload;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('is a button styled liked a regular link', function () {
        var component = getComponent(mockedStore, 'ACTION_A', {uri: 'blah/blah/789'});

        expect(component.find('button').length).toBe(1);
        expect(component.find('button').attr('class')).toContain('btn');
        expect(component.find('button').attr('class')).toContain('btn-link');

    });

    it('does a call to store.dispatch when clicked', function () {
        var component;

        spyOn(mockedStore, 'dispatch');

        //Scenario A
        component = getComponent(mockedStore, 'ACTION_A', {uri: 'blah/blah/789'});
        component.find('button')[0].click();

        expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockedStore.dispatch).toHaveBeenCalledWith({
            type: 'ACTION_A',
            payload: {
                uri: 'blah/blah/789'
            }
        });

        //Scenario B
        component = getComponent(mockedStore, 'ACTION_Z', {needsSpecialTreatment: true});
        component.find('button')[0].click();

        expect(mockedStore.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedStore.dispatch).toHaveBeenCalledWith({
            type: 'ACTION_Z',
            payload: {
                needsSpecialTreatment: true
            }
        });
    });
});