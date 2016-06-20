(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlReducers', urlReducersFactory);

    urlReducersFactory.$inject  =['ACTIONS', 'urlToState', 'DEFAULT_STATE'];

    function urlReducersFactory (ACTIONS, urlToState, DEFAULT_STATE) {
        var reducers = {};

        reducers[ACTIONS.URL_CHANGE] = urlChangeReducer;

        return reducers;

        function urlChangeReducer (oldState, payload) {
            //The oldState doesn't matter here (denk ik???), only look at the new URL
            var newState = {};

            /**
             * isLoading ook zetten hier!@!! of niet? hmmmm
             */

            newState.search = getSearchState(payload);
            newState.map = getMapState(payload);
            newState.page = payload.pagina || DEFAULT_STATE.page;
            newState.detail = payload.detail ? {uri: payload.detail} : DEFAULT_STATE.detail;
            newState.straatbeeld = getStraatbeeldState(payload);

            return newState;

            function getSearchState (payload) {
                if (isLocation(payload.zoek)) {
                    return {
                        query: null,
                        location: payload.zoek.split(',')
                    };
                } else if (angular.isString(payload.zoek)) {
                    return {
                        query: payload.zoek,
                        location: null
                    };
                } else {
                    return null;
                }

                /**
                 * @description Check if a String matches this location format: '53.123,4.789'.
                 *
                 * @param {String} location
                 *
                 * @returns {Boolean}
                 */
                function isLocation (location) {
                    return angular.isArray(
                        location.match(/^\d+\.\d+,\d+\.\d+$/)
                    );
                }
            }

            function getMapState (payload) {
                return {
                    baseLayer: payload.basiskaart || DEFAULT_STATE.map.baseLayer,
                    overlays: payload.lagen ? payload.lagen.join(',') : DEFAULT_STATE.map.overlays,
                    viewCenter: [
                        payload.lat || DEFAULT_STATE.map.viewCenter[0],
                        payload.lon || DEFAULT_STATE.map.viewCenter[1]
                    ],
                    zoom: payload.zoom || DEFAULT_STATE.map.zoom,
                    highlight: payload.selectie || DEFAULT_STATE.map.highlight
                };
            }

            function getStraatbeeldState (payload) {
                if (payload.id) {
                    return {
                        id: payload.id,
                        camera: {
                            location: null,
                            heading: payload.heading || 0,
                            pitch: payload.pitch || 0,
                            fov: payload.fov
                        }
                    };
                } else {
                    return null;
                }
            }
        }
    }
})();