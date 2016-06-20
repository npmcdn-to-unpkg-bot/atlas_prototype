(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlReducers', urlReducersFactory);

    urlReducersFactory.$inject  =['ACTIONS', 'urlToState'];

    function urlReducersFactory (ACTIONS, urlToState) {
        var reducers = {};

        reducers[ACTIONS.URL_CHANGE] = urlChangeReducer;

        return reducers;

        function urlChangeReducer (oldState, payload) {
            //The oldState doesn't matter here, only look at the new URL


            return newState;
        }
    }
})();