(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('layers', layersFactory);

        layersFactory.$inject = ['L', 'mapConfig', 'BASE_LAYERS', 'OVERLAYS'];

    function layersFactory (L, mapConfig, BASE_LAYERS, OVERLAYS) {
        var baseLayer,
            wmsLayers = {};

        return {
            setBaseLayer: setBaseLayer,
            addOverlay: addOverlay,
            removeOverlay: removeOverlay
        };

        /*
         * @param {Object} map - A Leaflet map instance
         * @param {String} layerName - A reference to a key of the BASE_LAYERS.TEMPLATES object
         */
        function setBaseLayer (leafletMap, layerName) {
            var template;

            if (leafletMap.hasLayer(baseLayer)) {
                leafletMap.removeLayer(baseLayer);
            }

            template = getBaseLayerTemplate(layerName);

            baseLayer = L.tileLayer(
                template,
                {
                    subdomains: mapConfig.TILE_DOMAINS,
                    minZoom: 8,
                    maxZoom: 16,
                    tms: true
                }
            );

            leafletMap.addLayer(baseLayer);

            function getBaseLayerTemplate (layerName) {
                var baseLayer;

                baseLayer = BASE_LAYERS.filter(function (baseLayer) {
                    return layerName === baseLayer.slug;
                })[0];

                return baseLayer.urlTemplate;
            }
        }

        function addOverlay (leafletMap, layerName) {
            getSubLayers(layerName).forEach(function (layer) {
                leafletMap.addLayer(layer);
            });
        }

        function removeOverlay (leafletMap, layerName) {
            getSubLayers(layerName).forEach(function (layer) {
                leafletMap.removeLayer(layer);
            });
        }

        function getSubLayers (overlayName) {
            var wmsUrl,
                wmsSource;

            if (angular.isUndefined(wmsLayers[overlayName])) {
                wmsLayers[overlayName] = [];

                wmsUrl = OVERLAYS[overlayName].url;

                if (!OVERLAYS[overlayName].external) {
                    wmsUrl = mapConfig.MAP_ROOT + wmsUrl;
                }

                var options = {
                    identify: false,
                    format: 'image/png',
                    transparent: true
                };

                wmsSource = L.WMS.source(wmsUrl, options);

                OVERLAYS[overlayName].layers.forEach(function (layerName) {
                    wmsLayers[overlayName].push(wmsSource.getLayer(layerName));
                });
            }
            console.log(wmsLayers);
            return wmsLayers[overlayName];
        }
    }
})();
