xdescribe('The dashboard component', function () {
    var $compile,
        $rootScope,
        store,
        state;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            {
                store: {
                    subscribe: function () {},
                    getState: function () {
                        return state;
                    }
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _DEFAULT_STATE_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            state = _DEFAULT_STATE_;
        });
    });

    function getComponent () {
        var component,
            element,
            scope;

        element = document.createElement('atlas-dashboard');
        scope = $rootScope.$new();

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('subscribes to the store to listen for changes', function () {
        spyOn(store, 'subscribe');

        getComponent();

        expect(store.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });

    describe('by default', function () {
        it('has no the left column', function () {

        });

        it('shows a small map (1/3) in the middle column', function () {

        });

        it('shows a large page (2/3) in the right page', function () {

        });
    });

    describe('after searching by query or location', function () {
        it('shows no left column', function () {

        });

        it('shows a large map (2/3) in the middle column', function () {

        });

        it('shows search results in a small (1/3) in the right column', function () {

        });
    });

    describe('when visiting a detail page', function () {
        it('shows no left column', function () {

        });

        it('shows a small map (1/3) in the middle column', function () {

        });

        it('shows a large detail page (2/3) in the right column', function () {

        });
    });

    describe('when visiting straatbeeld', function () {
        it('shows no left column', function () {

        });

        it('shows a small map (1/3) in the middle column', function () {

        });

        it('shows a large straatbeeld (2/3) in the right column', function () {

        });
    });

    describe('when using layer selection', function () {
        it('shows layer selection in a small (1/3) left column', function () {

        });

        it('shows a large map (2/3) in the middle column', function () {

        });

        it('shows no right column', function () {

        });
    });
});