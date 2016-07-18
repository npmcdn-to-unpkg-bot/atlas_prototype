(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('searchByClick', searchByClickFactory);

    searchByClickFactory.$inject = ['store', 'ACTIONS'];

    function searchByClickFactory (store, ACTIONS) {
        return {
            initialize: initialize
        };

        function initialize (leafletMap) {
            //leafletMap.on('click', searchByClick);
            leafletMap.addEventListener('click', searchByClick);
        }

        function searchByClick (event) {
            store.dispatch({
                type: ACTIONS.SHOW_SEARCH_RESULTS_BY_CLICK,
                payload: [
                    event.latlng.lat,
                    event.latlng.lng
                ]
            });
        }
    }
})();