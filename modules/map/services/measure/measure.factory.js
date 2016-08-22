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
            L.control.Measure(MEASURE_CONFIG).addTo(leafletMap);
        }
    }
})();