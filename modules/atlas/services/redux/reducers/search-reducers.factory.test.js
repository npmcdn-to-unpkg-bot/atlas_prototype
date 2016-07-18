describe('The search-reducers factory', function () {
    var searchReducers,
        defaultState;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_searchReducers_, _DEFAULT_STATE_) {
            searchReducers = _searchReducers_;
            defaultState = _DEFAULT_STATE_;
        });
    });

    describe('SHOW_SEARCH_RESULTS_BY_QUERY', function () {
        it('sets the search query and resets the search location', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.search = {
                query: null,
                location: [12.345, 6.789]
            };

            output = searchReducers.SHOW_SEARCH_RESULTS_BY_QUERY(inputState, 'linnaeus');

            expect(output.search.query).toBe('linnaeus');
            expect(output.search.location).toBeNull();
        });

        it('removes the highlighted object from the map', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.map.highlight = {some: 'object'};

            output = searchReducers.SHOW_SEARCH_RESULTS_BY_QUERY(inputState, 'linnaeus');

            expect(output.map.highlight).toBeNull();
        });

        it('hides the layer selection, page, detail and straatbeeld', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.map.showLayerSelection = true;
            inputState.page = 'somePage';
            inputState.detail = {some: 'object'};
            inputState.staatbeeld = {some: 'object'};

            output = searchReducers.SHOW_SEARCH_RESULTS_BY_QUERY(inputState, 'linnaeus');

            expect(output.map.showLayerSelection).toBe(false);
            expect(output.page).toBeNull();
            expect(output.detail).toBeNull();
            expect(output.straatbeeld).toBeNull();
        });
    });

    describe('SHOW_SEARCH_RESULTS_BY_CLICK', function () {
        it('resets the search query and sets the search location', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.search = {
                query: 'some query',
                location: null
            };

            output = searchReducers.SHOW_SEARCH_RESULTS_BY_CLICK(inputState, [52.001, 4.002]);

            expect(output.search.query).toBeNull();
            expect(output.search.location).toEqual([52.001, 4.002]);
        });

        it('removes the highlighted object from the map', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.map.highlight = {some: 'object'};

            output = searchReducers.SHOW_SEARCH_RESULTS_BY_CLICK(inputState, [52.001, 4.002]);

            expect(output.map.highlight).toBeNull();
        });

        it('hides the layer selection, page, detail and straatbeeld', function () {
            var inputState = angular.copy(defaultState),
                output;

            inputState.map.showLayerSelection = true;
            inputState.page = 'somePage';
            inputState.detail = {some: 'object'};
            inputState.staatbeeld = {some: 'object'};

            output = searchReducers.SHOW_SEARCH_RESULTS_BY_CLICK(inputState, [52.001, 4.002]);

            expect(output.map.showLayerSelection).toBe(false);
            expect(output.page).toBeNull();
            expect(output.detail).toBeNull();
            expect(output.straatbeeld).toBeNull();
        });
    });
});