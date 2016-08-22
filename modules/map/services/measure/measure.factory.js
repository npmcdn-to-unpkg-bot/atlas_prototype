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
            var measureControl = new L.Control.Measure(MEASURE_CONFIG);

            measureControl.addTo(leafletMap);
        }
    }
})();