(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('detailReducers', detailReducersFactory);

    detailReducersFactory.$inject = ['ACTIONS'];

    function detailReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.FETCH_DETAIL] = fetchDetailReducer;
        reducers[ACTIONS.SHOW_DETAIL] = showDetailReducer;

        return reducers;

        /**
         * @param {Object} oldState
         * @param {String} payload - An API endpoint
         *
         * @returns {Object} newState
         */
        function fetchDetailReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.detail = {
                endpoint: payload,
                isLoading: true
            };

            newState.map.isLoading = true;
            newState.map.highlight = null;
            newState.map.showLayerSelection = false;
            newState.map.isFullscreen = false;

            newState.search = null;
            newState.page = null;
            newState.straatbeeld = null;
            newState.dataSelection = null;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Object} payload - An object with two variables; location (Array) and highlight (GeoJSON).
         *
         * @returns {Object} newState
         */
        function showDetailReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            //Detail can be null if another action gets triggered between FETCH_DETAIL and SHOW_DETAIL
            if (angular.isObject(newState.detail)) {
                newState.detail.geometry = payload;

                newState.map.isLoading = false;
                newState.detail.isLoading = false;
            }

            return newState;
        }
    }
})();

