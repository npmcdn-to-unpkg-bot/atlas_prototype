(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('detailReducers', detailReducersFactory);

    detailReducersFactory.$inject = ['ACTIONS'];

    function detailReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.FETCH_DETAIL] = fetchDetailReducer;
        reducers[ACTIONS.SHOW_DETAIL] = showDetailReducer;

        return reducers;

        function fetchDetailReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.detail = {
                uri: payload,
                isLoading: true
            };

            newState.map.isLoading = true;
            newState.map.highlight = null;
            newState.map.showLayerSelection = false;

            newState.search = null;
            newState.page = null;
            newState.straatbeeld = null;

            return newState;
        }

        function showDetailReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.map.viewCenter = payload.location;
            newState.map.highlight = payload.highlight;
            newState.map.isLoading = false;
            newState.detail.isLoading = false;

            return newState;
        }
    }
})();

