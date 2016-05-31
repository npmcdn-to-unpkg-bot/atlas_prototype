(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = ['DEFAULT_STATE'];

    function reducerFactory (DEFAULT_STATE) {
        return function reducer (oldState, action) {
            var newState = angular.copy(oldState);

            switch (action.type) {
                case 'FETCH_SEARCH_RESULTS_BY_QUERY':
                    newState.search.query = action.payload;
                    newState.search.isLoading = true;

                    newState.map.highlight = null;
                    newState.search.location = null;
                    newState.page = null;
                    newState.detail = null;
                    newState.straatbeeld = null;

                    break;

                case 'FETCH_SEARCH_RESULTS_BY_CLICK':
                    newState.search.location = action.payload;
                    newState.search.isLoading = true;

                    newState.map.highlight = null;
                    newState.search.query = null;
                    newState.page = null;
                    newState.detail = null;
                    newState.straatbeeld = null;

                    break;

                case 'SHOW_SEARCH_RESULTS':
                    newState.search.isLoading = false;

                    break;

                case 'FETCH_DETAIL':
                    newState.detail = {
                        uri: action.payload,
                        isLoading: true
                    };
                    newState.map.isLoading = true;

                    newState.map.highlight = null;
                    newState.search.query = null;
                    newState.search.location = null;
                    newState.page = null;
                    newState.straatbeeld = null;
                    newState.map.highlight = null;

                    break;

                case 'SHOW_DETAIL':
                    newState.map.viewCenter = action.payload.location;
                    newState.map.highlight = action.payload.highlight;
                    newState.map.isLoading = false;
                    newState.detail.isLoading = false;

                    break;

                case 'SHOW_LAYERS':
                    newState.map.showLayerSelection = true;
                    break;

                case 'HIDE_LAYERS':
                    newState.map.showLayerSelection = false;
                    break;
            }

            return newState;
        };
    }
})();