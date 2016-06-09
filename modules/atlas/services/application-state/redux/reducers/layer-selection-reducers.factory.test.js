describe('The detailReducers factory', function () {
    var layerSelectionReducers,
        defaultState;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_layerSelectionReducers_) {
            layerSelectionReducers = _layerSelectionReducers_;
        });

        defaultState = {
            map: {
                baseLayer: 'topografie',
                overlays: [],
                viewCenter: [52.3719, 4.9012],
                zoom: 12,
                highlight: null,
                showLayerSelection: false,
                isLoading: false
            },
            search: null,
            page: 'welcome',
            detail: null,
            straatbeeld: null
        };
    });

    describe('SHOW_LAYER_SELECTION', function () {
        it('sets the variable to true', function () {
            var output = layerSelectionReducers.SHOW_LAYER_SELECTION(defaultState);

            expect(output.map.showLayerSelection).toBe(true);
        });
    });

    describe('HIDE_LAYER_SELECTION', function () {
        it('sets the variable to true', function () {
            var inputState,
                output;

            inputState = angular.copy(defaultState);
            inputState.map.showLayerSelection = false;

            output = layerSelectionReducers.HIDE_LAYER_SELECTION(inputState);

            expect(output.map.showLayerSelection).toBe(false);
        });
    });
});