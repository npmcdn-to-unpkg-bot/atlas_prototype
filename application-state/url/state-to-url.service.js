(function () {
    'use strict';

    angular
        .module('atlas')
        .service('stateToUrl', stateToUrlService);

    stateToUrlService.$inject = ['$location'];

    function stateToUrlService ($location) {
        return {
            updateUrl: updateUrl
        };

        function updateUrl (state) {
            var hasStraatbeeld;

            $location.search('zoek', state.query);

            $location.search('lat', state.map.location[0]);
            $location.search('lon', state.map.location[1]);
            $location.search('zoom', state.map.zoom);

            $location.search('page', state.page);
            $location.search('detail', state.detail);

            hasStraatbeeld = angular.isObject(state.straatbeeld);

            $location.search('straatbeeld', hasStraatbeeld ? state.straatbeeld.id : null);
            $location.search('heading', hasStraatbeeld ? state.straatbeeld.heading : null);
            $location.search('pitch', hasStraatbeeld ? state.straatbeeld.pitch : null);
            $location.search('fov', hasStraatbeeld ? state.straatbeeld.fov : null);
        }
    }
})();

