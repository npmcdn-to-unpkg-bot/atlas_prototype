(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('geojson', geojsonFactory);

    geojsonFactory.$inject = ['L', 'crsService'];

    function geojsonFactory (L, crsService) {
        var layers = {};

        return {
            initialize: initialize,
            add: add,
            remove: remove
        };

        function initialize () {
            L.Icon.Default.imagePath = 'assets';
        }

        function add (leafletMap, geoJSON) {
            var layer;

            geoJSON.geometry.crs = crsService.getRdObject();

            layer = L.Proj.geoJson(geoJSON.geometry, {
                style: function () {
                    return {
                        color: 'red',
                        fillColor: 'red',
                        weight: 2,
                        opacity: 1.6,
                        fillOpacity: 0.2
                    };
                }
            });

            layers[geoJSON.id] = layer;

            leafletMap.addLayer(layer);
        }

        function remove (leafletMap, geoJSON) {
            leafletMap.removeLayer(layers[geoJSON.id]);
        }
    }
})();