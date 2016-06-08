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
                        camera: {
                            location: null
                        },
                        isLoading: true
                    };

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
                    newState.search = null;
                    newState.page = null;
                    newState.detail = null;
                    break;

                case ACTIONS.SHOW_STRAATBEELD:
                    newState.straatbeeld.camera.location = action.payload.location;

                    //Only set the heading, pitch and fov if there is no known previous state
                    if (angular.isUndefined(oldState.straatbeeld.camera.heading)) {
                        newState.straatbeeld.camera.heading = action.payload.heading;
                    }

                    if (angular.isUndefined(oldState.straatbeeld.camera.pitch)) {
                        newState.straatbeeld.camera.pitch = action.payload.pitch;
                    }

                    if (angular.isUndefined(oldState.straatbeeld.camera.fov)) {
                        newState.straatbeeld.camera.fov = action.payload.fov;
                    }

                    newState.straatbeeld.isLoading = false;
                    break;

                case ACTIONS.STRAATBEELD_SET_HEADING:
                    newState.straatbeeld.camera.heading = action.payload;
                    break;

                case ACTIONS.STRAATBEELD_SET_PITCH:
                    newState.straatbeeld.camera.pitch = action.payload;
                    break;

                case ACTIONS.STRAATBEELD_SET_FOV:
                    newState.straatbeeld.camera.fov = action.payload;
                    break;
            }

            return newState;
        };
    }
})();