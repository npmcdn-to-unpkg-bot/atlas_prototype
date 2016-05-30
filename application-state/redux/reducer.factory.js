(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = ['DEFAULT_STATE'];

    function reducerFactory (DEFAULT_STATE) {
        return function reducer (oldState, action) {
            var newState = angular.copy(oldState);
            console.log(action.type);
            switch (action.type) {
                case 'URL_CHANGED':
                    if (action.params.query) {
                        newState.query = action.params.query;
                    }

                    if (action.params.lat && action.params.lon) {
                        newState.map.location = [action.params.lat, action.params.lon];
                    }

                    if (action.params.zoom) {
                        newState.map.zoom = action.params.zoom;
                    }

                    if (action.params.page) {
                        newState.page = action.params.page;
                    }

                    if (action.params.detail) {
                        newState.detail = action.params.detail;
                    }

                    if (action.params.straatbeeld) {
                        newState.straatbeeld = {
                            id: action.params.straatbeeld,
                            heading: action.params.heading
                        };
                    }

                    break;

                case 'SEARCH_BY_QUERY':
                    newState.search.query = action.query;
                    newState.page = 'search_results';
                    newState.detail = null;
                    newState.straatbeeld = null;
                    newState.map.highlight = null;
                    break;

                case 'FOLLOW_AUTOCOMPLETE_SUGGESTION':
                    newState.search.query = null;
                    newState.page = null;
                    newState.detail = action.uri;
                    newState.straatbeeld = null;
                    newState.map.isLoading = true;
                    newState.map.highlight = null;
                    break;

                case 'GO_TO_PAGE':
                    //newState.query = null;
                    newState.page = action.page;
                    //newState.detail = null;
                    //newState.straatbeeld = null;
                    //map selectie nog bepalen afh. van waar de page komt (popup of sidebar of blah)
                    break;

                case 'GO_TO_DETAIL':
                    newState.search.query = null;
                    newState.page = null;
                    newState.detail = action.uri;
                    newState.straatbeeld = null;
                    newState.map.isLoading = true;
                    break;
                case 'DETAIL_KLAAR_MET_LADEN':
                    newState.map.isLoading = false;
                    newState.map.location = [233, 3223];
                    //centreren en zoom aanpassen?
                    break;
                case 'GO_TO_STRAATBEELD':
                    newState.search.query = null;
                    newState.page = null;
                    newState.detail = null;
                    newState.straatbeeld = {
                        id: action.id,
                        heading: action.heading
                    };
                    newState.map.isLoading = true;
                    break;
                case 'STRAATBEELD_KLAAR_MET_LADEN':
                    newState.map.isLoading = false;
                    //newState.map.mapViewCenter = misschien??;
                    newState.straatbeeld.location = [12121, 34344];
                    break;
                case 'SEARCH_BY_CLICK_ON_MAP':
                    newState.map.highlight = 'een of ander punt';
                    newState.map.mapViewCenter = [];
                    //newState.map.zoom blijven we vanaf\
                    newState.page = 'search_results';

                    break;
                case 'SET_BASE_LAYER':
                    break;
                case 'ADD_OVETLAY':
                    break;
                case 'REMOVE_OVERLAY':
                    break;
                case 'MAP_PAN':
                    newState.map.location = action.location;
                    break;

                case 'MAP_ZOOM_IN':
                    newState.map.zoom++;
                    break;

                case 'MAP_ZOOM_OUT':
                    newState.map.zoom--;
                    break;
            }

            return newState;
        };
    }
})();