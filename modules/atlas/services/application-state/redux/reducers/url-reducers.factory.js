(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlReducers', urlReducersFactory);

    urlReducersFactory.$inject = ['ACTIONS', 'DEFAULT_STATE'];

    function urlReducersFactory (ACTIONS, DEFAULT_STATE) {
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
                newState.page = payload.pagina;
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
                if (payload.id) {
                    var location;

                    if (oldState.straatbeeld && oldState.straatbeeld.id === Number(payload.id)) {
                        location = oldState.straatbeeld.camera && oldState.straatbeeld.camera.location || null;
                    } else {
                        location = null;
                    }

                    return {
                        id: Number(payload.id),
                        camera: {
                            location: location,
                            heading: Number(payload.heading),
                            pitch: Number(payload.pitch),
                            fov: Number(payload.fov)
                        },
                        isLoading: false
                    };
                } else {
                    return null;
                }
            }
        }
    }
})();