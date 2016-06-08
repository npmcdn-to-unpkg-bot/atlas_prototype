/*
(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlMiddleware', urlMiddlewareFactory);

    urlMiddlewareFactory.$inject = ['stateToUrl'];

    function urlMiddlewareFactory (stateToUrl) {
        return function (store) {
            return function (next) {
                return function (action) {
                    var returnValue;

                    //Do the action first
                    returnValue = next(action);

                    //Then update the url with the new state
                    stateToUrl.updateUrl(store.getState());

                    return returnValue;
                };
            };
        };
    }
})();
*/