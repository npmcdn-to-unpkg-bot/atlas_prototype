(function () {
    angular
        .module('dpMap')
        .factory('zoom', zoomFactory);

    zoomFactory.$inject = ['$rootScope', 'L', 'store', 'ACTIONS', 'mapConfig'];

    function zoomFactory ($rootScope, L, store, ACTIONS, mapConfig) {
        return {
            initialize: initialize,
            setZoom: setZoom
        };

        function initialize (leafletMap) {
            L.control.scale(mapConfig.SCALE_OPTIONS).addTo(leafletMap);

            leafletMap.on('zoomend', function () {
                $rootScope.$applyAsync(function () {
                    store.dispatch({
                        type: ACTIONS.MAP_ZOOM,
                        payload: leafletMap.getZoom()
                    });
                });
            });
        }

        function setZoom (leafletMap, zoomLevel) {
            leafletMap.setZoom(zoomLevel);
        }
    }
})();