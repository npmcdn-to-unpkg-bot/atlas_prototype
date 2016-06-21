describe('The stateToUrlMiddleware factory', function () {
    var stateToUrlMiddleware,
        mockedStore = {
            getState: function () {
                return 'FAKE_STATE';
            }
        },
        mockedNext = function (action) {
            return action;
        },
        mockedAction = {
            type: 'FAKE_ACTION',
            payload: {}
        },
        stateToUrl;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_stateToUrlMiddleware_, _stateToUrl_) {
            stateToUrlMiddleware = _stateToUrlMiddleware_;
            stateToUrl = _stateToUrl_;
        });

        spyOn(stateToUrl, 'update');
    });

    it('calls the next action', function () {
        var returnValue;

        returnValue = stateToUrlMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toEqual({
            type: 'FAKE_ACTION',
            payload: {}
        });
    });

    it('and call the stateToUrl service', function () {
        stateToUrlMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(stateToUrl.update).toHaveBeenCalledWith('FAKE_STATE');
    });

    it('doesn\'t call stateToUrl.update for URL_CHANGE, FETCH_DETAIL and FETCH_STRAATBEELD', function () {
        ['URL_CHANGE', 'FETCH_DETAIL', 'FETCH_STRAATBEELD'].forEach(function (action) {
            stateToUrlMiddleware(mockedStore)(mockedNext)({
                type: action,
                payload: {}
            });

            expect(stateToUrl.update).not.toHaveBeenCalledWith('FAKE_STATE');
        });
    });

    it('does call stateToUrl.update for all other actions', function () {
        ['SHOW_DETAIL', 'SHOW_STRAATBEELD', 'SHOW_PAGE', 'HIDE_LAYER_SELECTION'].forEach(function (action) {
            stateToUrlMiddleware(mockedStore)(mockedNext)({
                type: action,
                payload: {}
            });

            expect(stateToUrl.update).toHaveBeenCalledWith('FAKE_STATE');
        });
    });
});
