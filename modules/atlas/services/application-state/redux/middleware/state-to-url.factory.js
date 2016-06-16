(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrlMiddleware', stateToUrlMiddlewareFactory);

    function stateToUrlMiddlewareFactory () {
        return function () {
            return function (next) {
                return function (action) {
                    console.log('ik ben middleware');

                    return next(action);
                };
            };
        };
    }
})();
