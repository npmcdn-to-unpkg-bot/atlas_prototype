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
            console.log('stateToUrl.update', state.map.viewCenter);
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
            searchParams.lat = state.map.viewCenter[0];
            searchParams.lon = state.map.viewCenter[1];
            searchParams.basiskaart = state.map.baseLayer;
            searchParams.lagen = state.map.overlays.length ? state.map.overlays.join(',') : null;
            searchParams.zoom = state.map.zoom;
            searchParams.selectie = state.map.highlight;

            //Page
            searchParams.pagina = state.page;

            //Detail
            searchParams.detail = state.detail && state.detail.uri;

            //Straatbeeld
            searchParams.id = state.straatbeeld && state.straatbeeld.id;
            searchParams.heading = state.straatbeeld && state.straatbeeld.camera && state.straatbeeld.camera.heading;
            searchParams.pitch = state.straatbeeld && state.straatbeeld.camera && state.straatbeeld.camera.pitch;
            searchParams.fov = state.straatbeeld && state.straatbeeld.camera && state.straatbeeld.camera.fov;

            $location.search(searchParams);
        }
    }
})();
