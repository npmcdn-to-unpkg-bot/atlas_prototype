(function () {
    angular
        .module('atlas')
        .constant('ACTIONS', {
            FETCH_DETAIL: 'FETCH_DETAIL',
            FETCH_SEARCH_RESULTS_BY_CLICK: 'FETCH_SEARCH_RESULTS_BY_CLICK',
            FETCH_SEARCH_RESULTS_BY_QUERY: 'FETCH_SEARCH_RESULTS_BY_QUERY',
            HIDE_LAYERS: 'HIDE_LAYERS',
            MAP_PAN: 'MAP_PAN',
            MAP_ADD_OVERLAY: 'MAP_ADD_OVERLAY',
            MAP_REMOVE_OVERLAY: 'MAP_REMOVE_OVERLAY',
            MAP_SET_BASELAYER: 'MAP_SET_BASELAYER',
            MAP_ZOOM: 'MAP_ZOOM',
            SHOW_DETAIL: 'SHOW_DETAIL',
            SHOW_LAYERS: 'SHOW_LAYERS',
            SHOW_PAGE: 'SHOW_PAGE',
            SHOW_SEARCH_RESULTS: 'SHOW_SEARCH_RESULTS'
        });
})();