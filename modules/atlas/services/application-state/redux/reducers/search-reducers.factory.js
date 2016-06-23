(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('searchReducers', searchReducersFactory);

    searchReducersFactory.$inject = ['ACTIONS'];

    function searchReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.SHOW_SEARCH_RESULTS_BY_QUERY] = showSearchResultsByQueryReducer;
        reducers[ACTIONS.SHOW_SEARCH_RESULTS_BY_CLICK] = showSearchResultsByClickReducer;

        return reducers;

        /**
         * @param {Object} oldState
         * @param {String} payload - A search query
         *
         * @returns {Object} newState
         */
        function showSearchResultsByQueryReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.search = {
                query: payload,
                location: null
            };

            newState.map.highlight = null;
            newState.map.showLayerSelection = false;
            newState.page = null;
            newState.detail = null;
            newState.straatbeeld = null;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Array} payload - A location, e.g. [52.123, 4.789]
         *
         * @returns {Object} newState
         */
        function showSearchResultsByClickReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.search = {
                query: null,
                location: payload
            };

            newState.map.highlight = null;
            newState.map.showLayerSelection = false;
            newState.page = null;
            newState.detail = null;
            newState.straatbeeld = null;

            return newState;
        }
    }
})();

