(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('straatbeeldReducers', straatbeeldReducersFactory);

    straatbeeldReducersFactory.$inject = ['ACTIONS'];

    function straatbeeldReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.FETCH_STRAATBEELD] = fetchStraatbeeldReducer;
        reducers[ACTIONS.SHOW_STRAATBEELD] = showStraatbeeldReducer;

        return reducers;

        /**
         * @description If the oldState had an active panorama it will remember the heading, pitch and fov. Otherwise
         * it'll use the car's orientation for the heading and pitch and a default FOV.
         *
         * @param {Object} oldState
         * @param {Number|Array} payload - A panorama ID (Number) or a location (Array)
         *
         * @returns {Object} newState
         */
        function fetchStraatbeeldReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.straatbeeld = {
                isLoading: true
            };

            if (angular.isNumber(payload)) {
                newState.straatbeeld.id = payload;
                newState.straatbeeld.searchLocation = null;
            } else {
                newState.straatbeeld.id = null;
                newState.straatbeeld.searchLocation = payload;
            }

            newState.map.highlight = null;
            newState.map.isLoading = true;
            newState.search = null;
            newState.page = null;
            newState.detail = null;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Array} payload - The location of the new panorama, e.g. [52.123, 4.789]
         *
         * @returns {Object} newState
         */
        function showStraatbeeldReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.map.isLoading = false;

            //After loading, the 'searchLocation' is no longer relevant, we now know the actual location of the panorama
            newState.straatbeeld.id = payload.id;
            newState.straatbeeld.searchLocation = null;

            newState.straatbeeld.isLoading = false;

            return newState;
        }
    }
})();
