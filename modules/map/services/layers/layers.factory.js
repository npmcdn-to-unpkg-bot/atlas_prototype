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
            if (map.hasLayer(baseLayer)) {
                map.removeLayer(baseLayer);
            }

            baseLayer = L.tileLayer(
                getBaseLayerTemplate(layerName),
                {
                    subdomains: mapConfig.TILE_DOMAINS,
                    minZoom: 8,
                    maxZoom: 16,
                    tms: true
                }
            );

            map.addLayer(baseLayer);

            function getBaseLayerTemplate (layerName) {
                var baseLayer;

                baseLayer = BASE_LAYERS.filter(function (baseLayer) {
                    return layerName === baseLayer.slug;
                })[0];

                return baseLayer.urlTemplate;
            }
        }
    }
})();
