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

    function getComponent (type, payload, className) {
        var component,
            element,
            scope;

        element = document.createElement('dp-link');
        element.setAttribute('type', type);
        element.setAttribute('payload', 'payload');

        if (angular.isString(className)) {
            element.setAttribute('class-name', className);
        }

        scope = $rootScope.$new();
        scope.payload = payload;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

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

    describe('styling', function () {
        it('can be done with the class-name attribute', function () {
            var component = getComponent('SHOW_PAGE', 'welkom', 'my-class my-other-class');

            expect(component.find('button').length).toBe(1);

            expect(component.find('button').attr('class')).toContain('my-class');
            expect(component.find('button').attr('class')).toContain('my-other-class');

            expect(component.find('button').attr('class')).not.toContain('btn');
            expect(component.find('button').attr('class')).not.toContain('btn-link');
        });

        it('has a default styling of a regular link', function () {
            var component = getComponent('SHOW_PAGE', 'welkom');
            console.log(component);
            expect(component.find('button').length).toBe(1);
            expect(component.find('button').attr('class')).toContain('btn');
            expect(component.find('button').attr('class')).toContain('btn-link');
        });
    });
});