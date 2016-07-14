(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('geojson', geojsonFactory);

    geojsonFactory.$inject = ['L', 'crsService', 'MARKER_CONFIG'];

    function geojsonFactory (L, crsService, MARKER_CONFIG) {
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

            console.log('geoJSON', geoJSON);

            geoJSON.geometry.crs = crsService.getRdObject();

            layer = L.Proj.geoJson(geoJSON.geometry, {
                style: function () {
                    return {
                        color: 'red',
                        fillColor: 'red',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.2,
                        rotate: '180deg'
                    };
                },
                pointToLayer: function (feature, latlng) {
                    var customIcon = L.icon(MARKER_CONFIG[geoJSON.id]);

                    return L.marker(latlng, {
                        icon: customIcon
                    });
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