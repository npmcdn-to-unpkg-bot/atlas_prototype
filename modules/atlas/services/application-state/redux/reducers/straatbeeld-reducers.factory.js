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
        reducers[ACTIONS.STRAATBEELD_SET_HEADING] = straatbeeldSetHeadingReducer;
        reducers[ACTIONS.STRAATBEELD_SET_PITCH] = straatbeeldSetPitchReducer;
        reducers[ACTIONS.STRAATBEELD_SET_FOV] = straatbeeldSetFovReducer;

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
                    location: null
                },
                isLoading: true
            };

            if (angular.isNumber(payload)) {
                newState.straatbeeld.id = payload;
                newState.straatbeeld.location = null;
            } else {
                newState.straatbeeld.id = null;
                newState.straatbeeld.location = payload;
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

            newState.straatbeeld = {};

            //After loading, the 'nearest panorama location' is no longer relevant, only the ID of the found panorama is
            newState.straatbeeld.id = payload.id;
            newState.straatbeeld.location = null;

            newState.straatbeeld.camera.location = payload.location;

            //Only set the heading, pitch and fov if there is no known previous state
            if (angular.isUndefined(oldState.straatbeeld.camera.heading)) {
                newState.straatbeeld.camera.heading = payload.heading;
            }

            if (angular.isUndefined(oldState.straatbeeld.camera.pitch)) {
                newState.straatbeeld.camera.pitch = payload.pitch;
            }

            if (angular.isUndefined(oldState.straatbeeld.camera.fov)) {
                newState.straatbeeld.camera.fov = payload.fov;
            }

            newState.straatbeeld.isLoading = false;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Number} payload - A number in degrees
         *
         * @returns {Object} newState
         */
        function straatbeeldSetHeadingReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.straatbeeld.camera.heading = payload;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Number} payload - A number in degrees
         *
         * @returns {Object} newState
         */
        function straatbeeldSetPitchReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.straatbeeld.camera.pitch = payload;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Number} payload - A number in degrees
         *
         * @returns {Object} newState
         */
        function straatbeeldSetFovReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.straatbeeld.camera.fov = payload;

            return newState;
        }
    }
})();
