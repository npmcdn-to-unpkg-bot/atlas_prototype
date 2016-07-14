(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('geojson', geojsonFactory);

    geojsonFactory.$inject = ['L', 'crsService', 'ICON_CONFIG', 'angleConversion'];

    function geojsonFactory (L, crsService, ICON_CONFIG, angleConversion) {
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
                },
                pointToLayer: function (feature, latlng) {
                    var icon,
                        rotationAngle;

                    icon = L.icon(ICON_CONFIG[geoJSON.id]);
                    rotationAngle = geoJSON.orientation || 0;

                    return L.marker(latlng, {
                        icon: icon,
                        rotationAngle: angleConversion.radiansToDegrees(rotationAngle)
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