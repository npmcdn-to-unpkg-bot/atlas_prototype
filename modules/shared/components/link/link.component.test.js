describe('The dp-link component', function () {
    var $compile,
        $rootScope,
        store;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
        });
    });

    function getComponent (type, payload) {
        var component,
            element,
            scope;

        element = document.createElement('dp-link');
        element.setAttribute('type', type);
        element.setAttribute('payload', 'payload');

        scope = $rootScope.$new();
        scope.payload = payload;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('is a button styled liked a regular link', function () {
        var component = getComponent('SHOW_PAGE', 'welkom');

        expect(component.find('button').length).toBe(1);
        expect(component.find('button').attr('class')).toContain('btn');
        expect(component.find('button').attr('class')).toContain('btn-link');
    });

    it('does a call to store.dispatch when clicked', function () {
        var component;

        spyOn(store, 'dispatch');

        //Scenario A
        component = getComponent('SHOW_PAGE', 'welkom');
        component.find('button')[0].click();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'SHOW_PAGE',
            payload: 'welkom'
        });

        //Scenario B
        component = getComponent('MAP_PAN', [101, 102]);
        component.find('button')[0].click();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'MAP_PAN',
            payload: [101, 102]
        });
    });
});