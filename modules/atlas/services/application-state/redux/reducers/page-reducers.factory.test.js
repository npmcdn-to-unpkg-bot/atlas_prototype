describe('The pageReducers factory', function () {
    var pageReducers,
        defaultState;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_pageReducers_, _DEFAULT_STATE_) {
            pageReducers = _pageReducers_;
            defaultState = _DEFAULT_STATE_;
        });
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