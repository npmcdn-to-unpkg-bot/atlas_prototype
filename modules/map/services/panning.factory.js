(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('panning', panningFactory);

    panningFactory.$inject = ['$rootScope', 'store', 'ACTIONS'];

    function panningFactory ($rootScope, store, ACTIONS) {
        return {
            initialize: initialize,
            panTo: panTo
        };

        function initialize (leafletMap) {
            leafletMap.on('moveend', function () {
                $rootScope.$applyAsync(function () {
                    store.dispatch({
                        type: ACTIONS.MAP_PAN,
                        payload: getCurrentLocation(leafletMap)
                    });
                });
            });
        }

        function panTo (leafletMap, location) {
            //Prevent infinite loop
            if (!angular.equals(location, getCurrentLocation(leafletMap))) {
                leafletMap.panTo(location);
            }
        }

        function getCurrentLocation (leafletMap) {
            var center = leafletMap.getCenter();

            return [center.lat, center.lng];
        }
    }
})();