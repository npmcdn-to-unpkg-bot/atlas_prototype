(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('measure', measureFactory);

    measureFactory.$inject = ['L', 'MEASURE_CONFIG'];

    function measureFactory (L, MEASURE_CONFIG) {
        return {
            initialize: initialize
        };

        function initialize (leafletMap) {
            var measureControl = new L.Control.Measure(MEASURE_CONFIG),
                leafletMeasureHtml;

            measureControl.addTo(leafletMap);

            leafletMeasureHtml = measureControl.getContainer();

            //Add a class to the button (which is actually a link, because leaflet-measure is a moron)
            leafletMeasureHtml.className += ' s-leaflet-measure';

            document.querySelector('.js-leaflet-measure').appendChild(leafletMeasureHtml);
        }
    }
})();