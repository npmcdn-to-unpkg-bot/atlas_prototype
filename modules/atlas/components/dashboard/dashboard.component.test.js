describe('The dashboard component', function () {
    var $compile,
        $rootScope,
        store,
        defaultState;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _DEFAULT_STATE_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            defaultState = angular.copy(_DEFAULT_STATE_);
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
        var component,
            columns;

        beforeEach(function () {
            spyOn(store, 'getState').and.returnValue(defaultState);

            component = getComponent();
            columns = component[0].querySelectorAll('.dashboard__content [class^="col-sm-"]');
        });

        it('has no the left column', function () {
            expect(columns.length).toBe(2);
            expect(columns[0].querySelector('atlas-layer-selection')).toBeNull();
        });

        it('shows a small map (1/3) in the middle column', function () {
            expect(columns[0].getAttribute('class')).toContain('col-sm-4');
            expect(columns[0].getAttribute('class')).not.toContain('col-sm-8');

            expect(columns[0].querySelector('dp-map')).not.toBeNull();
        });

        it('shows a large page (2/3) in the right page', function () {
            expect(columns[1].getAttribute('class')).toContain('col-sm-8');
            expect(columns[1].getAttribute('class')).not.toContain('col-sm-4');

            expect(columns[1].querySelector('atlas-page')).not.toBeNull();
            expect(columns[1].querySelector('atlas-detail')).toBeNull();
            expect(columns[1].querySelector('atlas-search-results')).toBeNull();
            expect(columns[1].querySelector('dp-straatbeeld')).toBeNull();
        });
    });

    ['query', 'location'].forEach(function (searchInput) {
        describe('after searching by ' + searchInput, function () {
            var component,
                columns;

            beforeEach(function () {
                var mockedState = angular.copy(defaultState);

                mockedState.page = null;

                if (searchInput === 'query') {
                    mockedState.search = {
                        query: 'this is a search query',
                        location: null
                    };
                } else {
                    mockedState.search = {
                        query: null,
                        location: [52.123, 4789]
                    };
                }

                spyOn(store, 'getState').and.returnValue(mockedState);

                component = getComponent();
                columns = component[0].querySelectorAll('.dashboard__content [class^="col-sm-"]');
            });

            it('shows no left column', function () {
                expect(columns.length).toBe(2);
                expect(columns[0].querySelector('atlas-layer-selection')).toBeNull();
            });

            it('shows a large map (2/3) in the middle column', function () {
                expect(columns[0].getAttribute('class')).toContain('col-sm-8');
                expect(columns[0].getAttribute('class')).not.toContain('col-sm-4');

                expect(columns[0].querySelector('dp-map')).not.toBeNull();
            });

            it('shows search results in a small (1/3) in the right column', function () {
                expect(columns[1].getAttribute('class')).toContain('col-sm-4');
                expect(columns[1].getAttribute('class')).not.toContain('col-sm-8');

                expect(columns[1].querySelector('atlas-search-results')).not.toBeNull();
                expect(columns[1].querySelector('atlas-page')).toBeNull();
                expect(columns[1].querySelector('atlas-detail')).toBeNull();
                expect(columns[1].querySelector('dp-straatbeeld')).toBeNull();
            });
        });
    });

    describe('when visiting a detail page', function () {
        var component,
            columns;

        beforeEach(function () {
            var mockedState = angular.copy(defaultState);

            mockedState.detail = {};
            mockedState.page = null;

            spyOn(store, 'getState').and.returnValue(mockedState);

            component = getComponent();
            columns = component[0].querySelectorAll('.dashboard__content [class^="col-sm-"]');
        });

        it('shows no left column', function () {
            expect(columns.length).toBe(2);
            expect(columns[0].querySelector('atlas-layer-selection')).toBeNull();
        });

        it('shows a small map (1/3) in the middle column', function () {
            expect(columns[0].getAttribute('class')).toContain('col-sm-4');
            expect(columns[0].getAttribute('class')).not.toContain('col-sm-8');

            expect(columns[0].querySelector('dp-map')).not.toBeNull();

        });

        it('shows a large detail page (2/3) in the right column', function () {
            expect(columns[1].getAttribute('class')).toContain('col-sm-8');
            expect(columns[1].getAttribute('class')).not.toContain('col-sm-4');

            expect(columns[1].querySelector('atlas-detail')).not.toBeNull();
            expect(columns[1].querySelector('atlas-search-results')).toBeNull();
            expect(columns[1].querySelector('atlas-page')).toBeNull();
            expect(columns[1].querySelector('dp-straatbeeld')).toBeNull();
        });
    });

    describe('when visiting straatbeeld', function () {
        var component,
            columns;

        beforeEach(function () {
            var mockedState = angular.copy(defaultState);

            mockedState.straatbeeld = {};
            mockedState.page = null;

            spyOn(store, 'getState').and.returnValue(mockedState);

            component = getComponent();
            columns = component[0].querySelectorAll('.dashboard__content [class^="col-sm-"]');
        });

        it('shows no left column', function () {
            expect(columns.length).toBe(2);
            expect(columns[0].querySelector('atlas-layer-selection')).toBeNull();
        });

        it('shows a small map (1/3) in the middle column', function () {
            expect(columns[0].getAttribute('class')).toContain('col-sm-4');
            expect(columns[0].getAttribute('class')).not.toContain('col-sm-8');

            expect(columns[0].querySelector('dp-map')).not.toBeNull();
        });

        it('shows a large straatbeeld (2/3) in the right column', function () {
            expect(columns[1].getAttribute('class')).toContain('col-sm-8');
            expect(columns[1].getAttribute('class')).not.toContain('col-sm-4');

            expect(columns[1].querySelector('dp-straatbeeld')).not.toBeNull();
            expect(columns[1].querySelector('atlas-detail')).toBeNull();
            expect(columns[1].querySelector('atlas-search-results')).toBeNull();
            expect(columns[1].querySelector('atlas-page')).toBeNull();
        });
    });

    describe('when using layer selection', function () {
        var component,
            columns;

        beforeEach(function () {
            var mockedState = angular.copy(defaultState);

            mockedState.map.showLayerSelection = true;

            spyOn(store, 'getState').and.returnValue(mockedState);

            component = getComponent();
            columns = component[0].querySelectorAll('.dashboard__content [class^="col-sm-"]');
        });

        it('shows layer selection in a small (1/3) left column', function () {
            expect(columns[0].querySelector('atlas-layer-selection')).not.toBeNull();
        });

        it('shows a large map (2/3) in the middle column', function () {
            expect(columns[1].getAttribute('class')).toContain('col-sm-8');
            expect(columns[1].getAttribute('class')).not.toContain('col-sm-4');

            expect(columns[1].querySelector('dp-map')).not.toBeNull();
        });

        it('shows no right column', function () {
            expect(columns.length).toBe(2);
        });
    });
});