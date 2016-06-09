describe('The detailReducers factory', function () {
    var pageReducers,
        defaultState;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_pageReducers_) {
            pageReducers = _pageReducers_;
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

    describe('SHOW_PAGE', function () {
        it('sets page name', function () {
            var output;

            output = pageReducers.SHOW_PAGE(defaultState, 'welcome');
            expect(output.page).toBe('welcome');

            output = pageReducers.SHOW_PAGE(defaultState, 'goodbye');
            expect(output.page).toBe('goodbye');
        });
    });
});