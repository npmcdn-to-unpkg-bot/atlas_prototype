describe('The detailReducers factory', function () {
    var detailReducers,
        defaultState;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_detailReducers_, _DEFAULT_STATE_) {
            detailReducers = _detailReducers_;
            defaultState = _DEFAULT_STATE_
        });
    });

    describe('FETCH_DETAIL', function () {
        it('sets the URI for detail', function () {
            var payload = 'bag/thing/123/',
                output;

            output = detailReducers.FETCH_DETAIL(defaultState, payload);

            expect(output.detail.uri).toBe('bag/thing/123/');
        });

        it('sets loading indicators for map and detail', function () {
            var payload = 'bag/thing/123/',
                output;

            output = detailReducers.FETCH_DETAIL(defaultState, payload);

            expect(output.detail.isLoading).toBe(true);
            expect(output.map.isLoading).toBe(true);
        });

        it('removes highlights from the map', function () {
            var payload = 'bag/thing/123/',
                inputState = angular.copy(defaultState),
                output;

            inputState.map.highlight = {some: 'object'};

            output = detailReducers.FETCH_DETAIL(inputState, payload);
            expect(output.map.highlight).toBeNull();
        });

        it('disables layer selection, search, page and straatbeeld', function () {
            var payload = 'bag/thing/123/',
                inputState = angular.copy(defaultState),
                output;

            inputState.map.showLayerSelection = true;
            inputState.search = {some: 'object'};
            inputState.page = 'somePage';
            inputState.straatbeeld = {some: 'object'};

            output = detailReducers.FETCH_DETAIL(inputState, payload);

            expect(output.map.showLayerSelection).toBe(false);
            expect(output.search).toBeNull();
            expect(output.page).toBeNull();
            expect(output.straatbeeld).toBeNull();
        });
    });

    describe('SHOW_DETAIL', function () {
        var stateAfterFetchDetail = {
                map: {
                    baseLayer: 'topografie',
                    overlays: [],
                    viewCenter: [52.3719, 4.9012],
                    zoom: 12,
                    highlight: null,
                    showLayerSelection: false,
                    isLoading: true
                },
                search: null,
                page: null,
                detail: {
                    uri: 'bag/thing/123/',
                    isLoading: true
                },
                straatbeeld: null
            },
            payload = {
                location: [52.52, 4.4],
                highlight: {some: 'object'}
            };

        it('centers the map', function () {
            var output = detailReducers.SHOW_DETAIL(stateAfterFetchDetail, payload);

            expect(output.map.viewCenter).toEqual([52.52, 4.4]);
        });

        it('highlights an object on the map', function () {
            var output = detailReducers.SHOW_DETAIL(stateAfterFetchDetail, payload);

            expect(output.map.highlight).toEqual({some: 'object'});
        });

        it('removes loading indicators for map and detail', function () {
            var output = detailReducers.SHOW_DETAIL(stateAfterFetchDetail, payload);

            expect(output.map.isLoading).toBe(false);
            expect(output.detail.isLoading).toBe(false);
        });
    });
});