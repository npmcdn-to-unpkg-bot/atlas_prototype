(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('measure', measureFactory);

    measureFactory.$inject = ['$document', 'L', 'MEASURE_CONFIG'];

    function measureFactory ($document, L, MEASURE_CONFIG) {
        return {
            initialize: initialize
        };

        function initialize (leafletMap) {
            MEASURE_CONFIG.popupOptions = {
                className: 'add-to-popup',
                offset: L.Point(-10, -10)
            };
            var measureControl = new L.Control.Measure(MEASURE_CONFIG),
                leafletMeasureHtml;

            measureControl.addTo(leafletMap);

            leafletMeasureHtml = measureControl.getContainer();

            //Add a class to leaflet-measure control
            leafletMeasureHtml.className += ' s-leaflet-measure';

            $document[0].querySelector('.js-leaflet-measure').appendChild(leafletMeasureHtml);
        }
    }
})();