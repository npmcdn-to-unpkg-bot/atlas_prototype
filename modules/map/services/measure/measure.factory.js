(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('measure', measureFactory);

    measureFactory.$inject = ['$document', '$rootScope', 'L', 'MEASURE_CONFIG', 'store', 'ACTIONS'];

    function measureFactory ($document, $rootScope, L, MEASURE_CONFIG, store, ACTIONS) {
        return {
            initialize: initialize
        };

        function initialize (leafletMap) {
            var measureControl = new L.Control.Measure(MEASURE_CONFIG),
                leafletMeasureHtml;

            measureControl.addTo(leafletMap);

            leafletMeasureHtml = measureControl.getContainer();
            leafletMeasureHtml.className += ' s-leaflet-measure';
            $document[0].querySelector('.js-leaflet-measure').appendChild(leafletMeasureHtml);

            leafletMap.on('measurestart', function () {
                $rootScope.$applyAsync(function () {
                    store.dispatch({
                        type: ACTIONS.HIDE_ACTIVE_OVERLAYS
                    });
                });
            });
        }
    }
})();