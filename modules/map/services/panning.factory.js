(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('panning', panningFactory);

    panningFactory.$inject = ['$rootScope', 'store', 'ACTIONS'];

    function panningFactory ($rootScope, store, ACTIONS) {
        return {
            initialize: initialize
        };

        function initialize (leafletMap) {
            leafletMap.on('moveend', function () {
                var center = leafletMap.getCenter();

                $rootScope.$applyAsync(function () {
                    store.dispatch({
                        type: ACTIONS.MAP_PAN,
                        payload: [
                            center.lat,
                            center.lng
                        ]
                    });
                });
            });
        }
    }
})();