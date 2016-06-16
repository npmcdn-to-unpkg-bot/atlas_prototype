(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrlMiddleware', stateToUrlMiddlewareFactory);

    stateToUrlMiddlewareFactory.$inject = ['stateToUrl'];

    function stateToUrlMiddlewareFactory (stateToUrl) {
        return function (store) {
            return function (next) {
                return function (action) {
                    var returnValue;

                    //Update the state first
                    returnValue = next(action);

                    //Then update the URL
                    stateToUrl.update(store.getState());

                    return returnValue;
                };
            };
        };
    }
})();
