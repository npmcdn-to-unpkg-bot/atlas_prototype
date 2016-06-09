(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('mapReducers', mapReducersFactory);

    mapReducersFactory.$inject = ['ACTIONS'];

    function mapReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.MAP_SET_BASELAYER] = mapSetBaselayerReducer;
        reducers[ACTIONS.MAP_ADD_OVERLAY] = mapAddOverlayReducer;
        reducers[ACTIONS.MAP_REMOVE_OVERLAY] = mapRemoveOverlayReducer;
        reducers[ACTIONS.MAP_PAN] = mapPanReducer;
        reducers[ACTIONS.MAP_ZOOM] = mapZoomReducer;

        return reducers;

        function mapSetBaselayerReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.map.baseLayer = payload;

            return newState;
        }

        function mapAddOverlayReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.map.overlays.push(payload);

            return newState;
        }

        function mapRemoveOverlayReducer (oldState, payload) {
            var newState = angular.copy(oldState),
                index;

            index = newState.map.overlays.indexOf(payload);
            newState.map.overlays.splice(index, 1);

            return newState;
        }

        function mapPanReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.map.viewCenter = payload;

            return newState;
        }

        function mapZoomReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.map.zoom = payload;

            return newState;
        }
    }
})();

