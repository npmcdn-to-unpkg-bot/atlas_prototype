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
        reducers[ACTIONS.STRAATBEELD_SET_ORIENTATION] = setOrientationReducer;

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


            /*
             straatbeeld: {
                id: 1,
                searchLocation: null,
                date: null,
                car: {
                    location: [52.789, 4.123],
                    heading: 20,
                    pitch: 0.1
                },
                hotspots: [],
                isLoading: false
             }
             */

            if (angular.isNumber(payload)) {
                newState.straatbeeld.id = payload;
                newState.straatbeeld.searchLocation = null;
            } else {
                newState.straatbeeld.id = null;
                newState.straatbeeld.searchLocation = payload;
            }

            newState.straatbeeld.date = null;
            newState.straatbeeld.car = null;
            newState.straatbeeld.hotspots = [];
            newState.straatbeeld.isLoading = true;

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

            newState.straatbeeld = payload;

            if (oldState.straatbeeld && angular.isObject(oldState.straatbeeld.camera)) {
                //use the previous camera orientation
                newState.straatbeeld.camera = oldState.straatbeeld.camera;
            } else {
                //Or copy the car's orientation if there is no previous orientation
                newState.straatbeeld.camera = {
                    heading: newState.straatbeeld.car.heading,
                    pitch: newState.straatbeeld.car.pitch
                };
            }

            newState.map.isLoading = false;

            //After loading, the 'searchLocation' is no longer relevant, we now know the actual location of the panorama
            newState.straatbeeld.searchLocation = null;
            newState.straatbeeld.isLoading = false;

            return newState;
        }

        function setOrientationReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.straatbeeld.camera = payload;

            return newState;
        }
    }
})();
