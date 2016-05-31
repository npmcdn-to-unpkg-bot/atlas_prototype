(function () {
    'use strict';

    angular
        .module('atlas')
        .constant('ACTIONS', {
            URL_CHANGED: 'URL_CHANGED',
            SEARCH_BY_QUERY: '',
            FOLLOW_AUTOCOMPLETE_SUGGESTION: '',
            GO_TO_PAGE: '',
            GO_TO_DETAIL: '',
            DETAIL_KLAAR_MET_LADEN: '',
            GO_TO_STRAATBEELD: '',
            STRAATBEELD_KLAAR_MET_LADEN: '',
            SEARCH_BY_CLICK_ON_MAP: '',
            SET_BASE_LAYER: '',
            ADD_OVETLAY: '',
            REMOVE_OVERLAY: '',
            MAP_PAN: '',
            MAP_ZOOM_IN: '',
            MAP_ZOOM_OUT: ''
        });
})();