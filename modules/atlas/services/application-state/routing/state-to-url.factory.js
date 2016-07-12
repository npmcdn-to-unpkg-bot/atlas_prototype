(function () {
    'use strict';

    angular
        .module('atlas')
        .service('stateToUrl', stateToUrlFactory);

    stateToUrlFactory.$inject = ['$location'];

    function stateToUrlFactory ($location) {
        return {
            update: update
        };

        function update (state) {
            var searchParams = {};

            //Search
            if (state.search) {
                if (angular.isString(state.search.query)) {
                    searchParams.zoek = state.search.query;
                } else {
                    searchParams.zoek = state.search.location.join(',');
                }
            }

            //Map
            searchParams.lat = String(state.map.viewCenter[0]);
            searchParams.lon = String(state.map.viewCenter[1]);
            searchParams.basiskaart = state.map.baseLayer;
            searchParams.lagen = state.map.overlays.length ? state.map.overlays.join(',') : null;
            searchParams.zoom = String(state.map.zoom);
            searchParams.selectie = state.map.highlight;

            //Page
            searchParams.pagina = state.page;

            //Detail
            searchParams.detail = state.detail && state.detail.endpoint;

            //Straatbeeld
            if (state.straatbeeld) {
                if (state.straatbeeld.id) {
                    searchParams.id = String(state.straatbeeld.id);
                } else {
                    searchParams.plat = String(state.straatbeeld.searchLocation[0]);
                    searchParams.plon = String(state.straatbeeld.searchLocation[1]);
                }
            }

            $location.search(searchParams);
        }
    }
})();
