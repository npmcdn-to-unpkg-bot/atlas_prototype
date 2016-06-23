(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('layers', layersFactory);

        layersFactory.$inject = ['L', 'BASE_LAYERS', 'mapConfig'];

    function layersFactory (L, BASE_LAYERS, mapConfig) {
        var baseLayer;

        return {
            setBaseLayer: setBaseLayer
        };

        /*
         * @param {Object} map - A Leaflet map instance
         * @param {String} layerName - A reference to a key of the BASE_LAYERS.TEMPLATES object
         */
        function setBaseLayer (map, layerName) {
            var options = BASE_LAYERS.OPTIONS;

            options.subdomains = mapConfig.TILE_DOMAINS;

            if (map.hasLayer(baseLayer)) {
                map.removeLayer(baseLayer);
            }

            baseLayer = L.tileLayer(
                BASE_LAYERS.TEMPLATES[layerName],
                options
            );

            map.addLayer(baseLayer);
        }
    }
})();
