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
                camera: {
                    location: null,
                    heading: null,
                    pitch: null,
                    fov: null
                },
                isLoading: true
            };

            if (angular.isNumber(payload)) {
                newState.straatbeeld.id = payload;
                newState.straatbeeld.searchLocation = null;
            } else {
                newState.straatbeeld.id = null;
                newState.straatbeeld.searchLocation = payload;
            }

            //Save the orientation from the previous state when navigating to another panorama
            if (oldState.straatbeeld && oldState.straatbeeld.camera && oldState.straatbeeld.camera.heading) {
                newState.straatbeeld.camera.heading = oldState.straatbeeld.camera.heading;
            }

            if (oldState.straatbeeld && oldState.straatbeeld.camera && oldState.straatbeeld.camera.pitch) {
                newState.straatbeeld.camera.pitch = oldState.straatbeeld.camera.pitch;
            }

            if (oldState.straatbeeld && oldState.straatbeeld.camera && oldState.straatbeeld.camera.fov) {
                newState.straatbeeld.camera.fov = oldState.straatbeeld.camera.fov;
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

            newState.straatbeeld.id = payload.id;

            //After loading, the 'searchLocation' is no longer relevant, we now know the actual location of the panorama
            newState.straatbeeld.searchLocation = null;
            newState.straatbeeld.camera.location = payload.camera.location;

            //Only set the heading and pitch if there is no known previous state
            if (oldState.straatbeeld.camera.heading === null) {
                newState.straatbeeld.camera.heading = payload.camera.heading;
            }

            if (oldState.straatbeeld.camera.pitch === null) {
                newState.straatbeeld.camera.pitch = payload.camera.pitch;
            }

            newState.straatbeeld.isLoading = false;

            return newState;
        }
    }
})();
