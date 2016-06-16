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
        mockedAction = 'FAKE_ACTION',
        stateToUrl;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_stateToUrlMiddleware_, _stateToUrl_) {
            stateToUrlMiddleware = _stateToUrlMiddleware_;
            stateToUrl = _stateToUrl_;
        });
    });

    it('calls the next action', function () {
        var returnValue;

        returnValue = stateToUrlMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(returnValue).toBe('FAKE_ACTION');
    });

    it('and call the stateToUrl service', function () {
        spyOn(stateToUrl, 'update');

        stateToUrlMiddleware(mockedStore)(mockedNext)(mockedAction);

        expect(stateToUrl.update).toHaveBeenCalledWith('FAKE_STATE');
    });
});
