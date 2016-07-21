xdescribe('The atlas-header component', function () {
    var $compile,
        $rootScope,
        store,
        ACTIONS;

    beforeEach(function () {
        angular.mock.module(
            'atlasHeader',
            {
                store: {
                    dispatch: function () {}
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _ACTIONS_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        spyOn(store, 'dispatch');
    });

    function getComponent (query) {
        var component,
            element,
            scope;

        element = document.createElement('atlas-header');
        element.setAttribute('query', query);

        scope = $rootScope.$new();

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('inserts the atlas-search component and passes down a query string', function () {
        var component;

        //Without a query
        component = getComponent('');
        expect(component.find('atlas-search')[0].getAttribute('query')).toBe('');

        //With a query
        component = getComponent('I_AM_A_FAKE_QUERY');
        expect(component.find('atlas-search')[0].getAttribute('query')).toBe('I_AM_A_FAKE_QUERY');
    });

    it('has two links that trigger the show page action', function () {
        var component = getComponent('');

        //FAQ
        component.find('.site-header__navigation__item').eq(1).click();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.SHOW_PAGE,
            payload: 'testlinks'
        });

        //About
        component.find('.site-header__navigation__item').eq(2).click();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.SHOW_PAGE,
            payload: 'over-ons'
        });
    });
});