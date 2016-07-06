(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlReducers', urlReducersFactory);

    urlReducersFactory.$inject = ['$location', 'ACTIONS', 'DEFAULT_STATE'];

    function urlReducersFactory ($location, ACTIONS, DEFAULT_STATE) {
        var reducers = {};

        reducers[ACTIONS.URL_CHANGE] = urlChangeReducer;

        return reducers;

        function urlChangeReducer (oldState, payload) {
            if (angular.equals(payload, {})) {
                return DEFAULT_STATE;
            } else {
                var newState = {};

                newState.search = getSearchState(payload);
                newState.map = getMapState(payload);
                newState.page = payload.pagina || null;
                newState.detail = getDetailState(payload);
                newState.straatbeeld = getStraatbeeldState(oldState, payload);

                return newState;
            }

            function getSearchState (payload) {
                if (angular.isString(payload.zoek)) {
                    if (isLocation(payload.zoek)) {
                        return {
                            query: null,
                            location: payload.zoek.split(',').map(function (coordinate) {
                                return Number(coordinate);
                            })
                        };
                    } else {
                        return {
                            query: payload.zoek,
                            location: null
                        };
                    }
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
                    baseLayer: payload.basiskaart,
                    overlays: payload.lagen ? payload.lagen.split(',') : [],
                    viewCenter: [
                        Number(payload.lat),
                        Number(payload.lon)
                    ],
                    zoom: Number(payload.zoom),
                    highlight: payload.selectie || null,
                    showLayerSelection: angular.copy(oldState.map.showLayerSelection),
                    isLoading: false
                };
            }

            function getDetailState (payload) {
                if (angular.isString(payload.detail)) {
                    return {
                        uri: payload.detail,
                        isLoading: false
                    };
                } else {
                    return null;
                }
            }

            function getStraatbeeldState (oldState, payload) {
                if (hasStraatbeeld(payload)) {
                    var cameraLocation;

                    if (oldState.straatbeeld && oldState.straatbeeld.id === Number(payload.id)) {
                        cameraLocation = oldState.straatbeeld.camera && oldState.straatbeeld.camera.location || null;
                    } else {
                        cameraLocation = null;
                    }

                    return {
                        id: Number(payload.id) || null,
                        location: hasLocation(payload) ? [payload.plat, payload.plon] : null,
                        camera: {
                            location: cameraLocation,
                            heading: Number(payload.heading),
                            pitch: Number(payload.pitch),
                            fov: Number(payload.fov)
                        },
                        isLoading: false
                    };
                } else {
                    return null;
                }

                function hasStraatbeeld (payload) {
                    return payload.id || hasLocation(payload);
                }

                /**
                 * @description This is a 'search nearest straatbeeld' location, not the location of the camera of a
                 * found panorama scene.
                 */
                function hasLocation (payload) {
                    return angular.isNumber(payload.plat) && angular.isNumber(payload.plon);
                }
            }
        }
    }
})();