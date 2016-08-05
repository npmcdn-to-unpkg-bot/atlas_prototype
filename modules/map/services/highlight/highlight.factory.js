(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('highlight', highlightFactory);

    highlightFactory.$inject = ['L', 'crsService', 'ICON_CONFIG', 'angleConversion', 'mapConfig'];

    function highlightFactory (L, crsService, ICON_CONFIG, angleConversion, mapConfig) {
        var layers = {};

        activate();

        return {
            add: add,
            remove: remove
        };

        function activate () {
            L.Icon.Default.imagePath = 'assets';
        }

        /**
         * @param {Object} leafletMap - A Leaflet map instance
         * @param {Object} item - An object with the following properties:
         *  - id: in case of a marker this needs to be a mapping to a key of ICON_CONFIG
         *  - geometry: GeoJSON using RD coordinates
         */
        function add (leafletMap, item) {
            var layer,
                useAutoZoom;

            item.geometry.crs = crsService.getRdObject();

            layer = L.Proj.geoJson(item.geometry, {
                style: function () {
                    return {
                        color: 'red',
                        fillColor: 'red',
                        weight: 2,
                        opacity: 1.6,
                        fillOpacity: 0.2
                    };
                },
                pointToLayer: function (feature, latLng) {
                    var icon,
                        rotationAngle;

                    icon = L.icon(ICON_CONFIG[item.id]);
                    rotationAngle = item.orientation || 0;

                    return L.marker(latLng, {
                        icon: icon,
                        rotationAngle: angleConversion.radiansToDegrees(rotationAngle)
                    });
                }
            });

            layers[item.id] = layer;

            leafletMap.addLayer(layer);

            useAutoZoom = item.geometry.type === 'Polygon' || item.geometry.type === 'MultiPolygon';

            if (useAutoZoom) {
                var zoomLevel = leafletMap.getBoundsZoom(layer.getBounds());

                if (!isNaN(zoomLevel)) {
                    console.log('ga automatisch zoomen dan', zoomLevel);
                } else {
                    console.log('gebruik default' ,mapConfig.DEFAULT_ZOOM_HIGHLIGHT);
                }
            }
        }

        function remove (leafletMap, item) {
            leafletMap.removeLayer(layers[item.id]);
        }
    }
})();