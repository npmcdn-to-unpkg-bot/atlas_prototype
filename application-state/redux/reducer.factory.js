(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = ['ACTIONS'];

    function reducerFactory (ACTIONS) {
        return function reducer (oldState, action) {
            var newState = angular.copy(oldState);

            switch (action.type) {
                case ACTIONS.SHOW_SEARCH_RESULTS_BY_QUERY:
                    newState.search = {
                        query: action.payload,
                        location: null
                    };

                    newState.map.highlight = null;
                    newState.map.showLayerSelection = false;
                    newState.search.location = null;
                    newState.page = null;
                    newState.detail = null;
                    newState.straatbeeld = null;

                    break;

                case ACTIONS.SHOW_SEARCH_RESULTS_BY_CLICK:
                    newState.search = {
                        query: null,
                        location: action.payload
                    };

                    newState.map.highlight = null;
                    newState.map.showLayerSelection = false;
                    newState.search.query = null;
                    newState.page = null;
                    newState.detail = null;
                    newState.straatbeeld = null;

                    break;

                case ACTIONS.FETCH_DETAIL:
                    newState.detail = {
                        uri: action.payload,
                        isLoading: true
                    };

                    newState.map.isLoading = true;
                    newState.map.highlight = null;
                    newState.map.showLayerSelection = false;

                    newState.search = null;
                    newState.page = null;
                    newState.straatbeeld = null;

                    break;

                case ACTIONS.SHOW_DETAIL:
                    newState.map.viewCenter = action.payload.location;
                    newState.map.highlight = action.payload.highlight;
                    newState.map.isLoading = false;
                    newState.detail.isLoading = false;

                    break;

                case ACTIONS.SHOW_PAGE:
                    newState.page = action.payload;

                    newState.map.highlight = null;
                    newState.map.showLayerSelection = false;
                    newState.search = null;
                    newState.detail = null;
                    newState.staatbeeld = null;

                    break;

                case ACTIONS.SHOW_LAYER_SELECTION:
                    newState.map.showLayerSelection = true;
                    break;

                case ACTIONS.HIDE_LAYER_SELECTION:
                    newState.map.showLayerSelection = false;
                    break;

                case ACTIONS.MAP_SET_BASELAYER:
                    newState.map.baseLayer = action.payload;
                    break;

                case ACTIONS.MAP_ADD_OVERLAY:
                    newState.map.overlays.push(action.payload);
                    break;

                case ACTIONS.MAP_REMOVE_OVERLAY:
                    var index;

                    index = newState.map.overlays.indexOf(action.payload);
                    newState.map.overlays.splice(index, 1);

                    break;

                case ACTIONS.MAP_PAN:
                    newState.map.viewCenter = action.payload;
                    break;

                case ACTIONS.MAP_ZOOM:
                    newState.map.zoom = action.payload;
                    break;

                case ACTIONS.FETCH_STRAATBEELD:
                    newState.straatbeeld = {
                        id: action.payload,
                        heading: angular.isObject(oldState.straatbeeld) ? oldState.straatbeeld.heading : null,
                        pitch: angular.isObject(oldState.straatbeeld) ? oldState.straatbeeld.pitch : null,
                        fov: angular.isObject(oldState.straatbeeld) ? oldState.straatbeeld.fov : null,
                        isLoading: true
                    };

                    newState.map.highlight = null;
                    newState.search = null;
                    newState.page = null;
                    newState.detail = null;
                    break;

                case ACTIONS.SHOW_STRAATBEELD:
                    newState.straatbeeld.cameraLocation = action.payload.cameraLocation;

                    //Only set the heading, pitch and fov if there is no known previous state for that
                    if (newState.straatbeeld.heading === null) {
                        newState.straatbeeld.heading = action.payload.heading;
                    }

                    if (newState.straatbeeld.pitch === null) {
                        newState.straatbeeld.pitch = action.payload.pitch;
                    }

                    if (newState.straatbeeld.fov === null) {
                        newState.straatbeeld.fov = action.payload.fov;
                    }

                    newState.straatbeeld.isLoading = false;
                    break;

                case ACTIONS.STRAATBEELD_SET_HEADING:
                    newState.straatbeeld.heading = action.payload;
                    break;

                case ACTIONS.STRAATBEELD_SET_PITCH:
                    newState.straatbeeld.pitch = action.payload;
                    break;

                case ACTIONS.STRAATBEELD_SET_FOV:
                    newState.straatbeeld.fov = action.payload;
                    break;
            }

            return newState;
        };
    }
})();