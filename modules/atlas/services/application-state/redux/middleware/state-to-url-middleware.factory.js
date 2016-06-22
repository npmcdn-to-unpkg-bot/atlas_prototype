(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrlMiddleware', stateToUrlMiddlewareFactory);

    stateToUrlMiddlewareFactory.$inject = ['stateToUrl', 'ACTIONS'];

    function stateToUrlMiddlewareFactory (stateToUrl, ACTIONS) {
        var ignoreActions = [
            ACTIONS.URL_CHANGE, //Prevent infinite loops and
            ACTIONS.FETCH_DETAIL, //don't update the state before asynchronous call are finished
            ACTIONS.FETCH_STRAATBEELD
        ];

        return function (store) {
            return function (next) {
                return function (action) {
                    var returnValue;

                    //Update the state first
                    returnValue = next(action);

                    //Then update the URL
                    if (ignoreActions.indexOf(action.type) === -1) {
                        stateToUrl.update(store.getState());
                    }

                    return returnValue;
                };
            };
        };
    }
})();
